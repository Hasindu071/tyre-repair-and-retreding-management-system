const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../config/db'); // Import database connection

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        // Convert filename to include current timestamp + original extension
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Submit or update repair service using async/await
router.post(
    '/submit',
    upload.fields([{ name: 'insideDamagePhoto' }, { name: 'outsideDamagePhoto' }]),
    async (req, res) => {
        try {
            const {
                patchesApplied,
                punctureSize,
                tireBrand,
                internalStructure,
                receiveDate,
                notes,
                needDeliveryService,
                userId
            } = req.body;

            // Retrieve file names if uploaded and include "/uploads/" prefix
            const insideDamagePhoto = req.files?.insideDamagePhoto 
                ? `/uploads/${req.files.insideDamagePhoto[0].filename}` 
                : null;

            const outsideDamagePhoto = req.files?.outsideDamagePhoto 
                ? `/uploads/${req.files.outsideDamagePhoto[0].filename}` 
                : null;

            // Validate required fields
            if (!patchesApplied || !punctureSize || !tireBrand || !internalStructure || !receiveDate) {
                return res.status(400).json({ message: 'All required fields must be filled.' });
            }

            // Generate new service ID
            const [rows] = await db.promise().query('SELECT service_id FROM services ORDER BY service_id DESC LIMIT 1');
            let newServiceId = 'RP_00001';

            if (rows.length > 0) {
                const lastIdStr = String(rows[0].service_id);
                if (lastIdStr.startsWith('RP_')) {
                    const lastIdNumber = parseInt(lastIdStr.split('_')[1]);
                    if (!isNaN(lastIdNumber)) {
                        newServiceId = `RP_${(lastIdNumber + 1).toString().padStart(5, '0')}`;
                    } else {
                        console.error("Invalid numeric part in service_id:", lastIdStr);
                    }
                } else {
                    console.error("Unexpected service_id format:", lastIdStr);
                }
            }

            console.log("New service_id:", newServiceId);

            // Insert into services
            const query1 = `
                INSERT INTO services (service_id, tireBrand, internalStructure, receiveDate, notes, needDeliveryService, status, customer_ID, total_amount)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const status = 'Pending';
            const totalAmount = 0;

            await db.promise().query(query1, [
                newServiceId,
                tireBrand,
                internalStructure,
                receiveDate,
                notes,  
                needDeliveryService,
                status,
                userId,
                totalAmount
            ]);

            // Insert into repairing
            const query2 = `
                INSERT INTO repairing (id, patchesApplied, punctureSize, insideDamagePhoto, outsideDamagePhoto) 
                VALUES (?, ?, ?, ?, ?)
            `;
            await db.promise().query(query2, [
                newServiceId,
                patchesApplied,
                punctureSize,
                insideDamagePhoto,
                outsideDamagePhoto
            ]);

            return res.status(200).json({
                message: 'Repair details submitted successfully!',
                serviceId: newServiceId
            });

        } catch (error) {
            console.error('Unexpected error:', error);
            return res.status(500).json({ message: 'Unexpected server error.' });
        }
    }
);

// GET Repair Details by ID (with service details)
router.get('/getRepair/:id', async (req, res) => {
    const repairId = req.params.id;
    try {
        const [rows] = await db.promise().query(
            `SELECT r.*, s.tireBrand, s.internalStructure, s.receiveDate, s.notes, s.status AS serviceStatus, s.customer_ID, s.total_amount 
             FROM repairing r 
             JOIN services s ON r.id = s.service_id 
             WHERE r.id = ?`,
            [repairId]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Repair not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error fetching repair details:", error);
        res.status(500).json({ message: 'Server error retrieving repair details' });
    }
});

// Replace the updateRepairStatus function with the following:
const updateRepairStatus = async (req, res, newStatus, successMessage, errorMessage) => {
    const repairId = req.params.id; // This is the service_id value
    let query, params;
    
    if (newStatus === 'Rejected' && req.body.note) {
           // Update only the status in the services table 
        query = "UPDATE services SET status = ? WHERE service_id = ?";
        params = [newStatus, repairId];
        const [result] = await db.promise().query(query, params);
        if (result.affectedRows > 0) {
            // If customer_id is not provided in the request body, query the services table
            let customerId = req.body.customer_id;
            if (!customerId) {
                const [rows] = await db.promise().query("SELECT customer_ID FROM services WHERE service_id = ?", [repairId]);
                if (rows.length > 0) {
                    customerId = rows[0].customer_ID;
                }
            }
            if (!customerId) {
                return res.status(400).json({ message: "Customer ID not provided." });
            }
            // Insert a record into the reject_orders table
            const insertQuery = "INSERT INTO reject_orders (service_id, customer_id, note) VALUES (?, ?, ?)";
            await db.promise().query(insertQuery, [repairId, customerId, req.body.note]);
            return res.status(200).json({ message: successMessage });
        } else {
            return res.status(404).json({ message: "Repair service not found" });
        }
    } else {
        query = "UPDATE services SET status = ? WHERE service_id = ?";
        params = [newStatus, repairId];
    }
    
    try {
        const [result] = await db.promise().query(query, params);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: successMessage });
        } else {
            res.status(404).json({ message: "Repair service not found" });
        }
    } catch (error) {
        console.error(`Error updating repair status to ${newStatus}:`, error);
        res.status(500).json({ message: errorMessage, error: error.message });
    }
};

// Approve a repair service
router.put('/approveRepair/:id', async (req, res) => {
    updateRepairStatus(
        req,
        res,
        'Checking',
        "Repair service approved successfully",
        "Error approving repair service"
    );
});

// Reject a repair service (updates special_note if provided)
router.put('/rejectRepair/:id', async (req, res) => {
    updateRepairStatus(
        req,
        res,
        'Rejected',
        "Repair service rejected successfully",
        "Error rejecting repair service"
    );
});

// GET Approved Repair Details (with service details)
router.get('/approvedRepairs', async (req, res) => {
    try {
        const [rows] = await db.promise().query(
            `SELECT r.*, s.tireBrand, s.internalStructure, s.receiveDate, s.notes, s.status AS serviceStatus, s.customer_ID, s.total_amount
             FROM repairing r
             JOIN services s ON r.id = s.service_id
             WHERE r.status = ?`,
            ['Approved']
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching approved repairs:", error);
        res.status(500).json({ message: 'Server error fetching approved repairs' });
    }
});

module.exports = router;
