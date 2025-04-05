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
                userId
            } = req.body;

            // Retrieve file names if uploaded and include "/uploads/" prefix
            const insideDamagePhoto = req.files && req.files.insideDamagePhoto 
                ? `/uploads/${req.files.insideDamagePhoto[0].filename}` 
                : null;
            const outsideDamagePhoto = req.files && req.files.outsideDamagePhoto 
                ? `/uploads/${req.files.outsideDamagePhoto[0].filename}` 
                : null;

            // Validate required fields
            if (!patchesApplied || !punctureSize || !tireBrand || !internalStructure || !receiveDate) {
                return res.status(400).json({ message: 'All required fields must be filled.' });
            }

            // 1. Get the last service_id from the database
const [rows] = await db.promise().query('SELECT service_id FROM services ORDER BY service_id DESC LIMIT 1');
let newServiceId = 'RP_00001'; // Default starting service_id

if (rows.length > 0) {
    const lastServiceId = rows[0].service_id;

    // Ensure it's treated as a string just in case it's returned as something else (e.g., a Buffer)
    const lastIdStr = String(lastServiceId);

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
} else {
    console.log("No previous service_id found, using default.");
}

console.log("New service_id:", newServiceId);



            // First query: Insert into services
            const query1 = `
                INSERT INTO services (service_id, tireBrand, internalStructure,receiveDate, notes, status, customer_ID, total_amount)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const serviceId = 1; // Manually set service_id to 1
            const status = 'Pending'; // Default status
            const totalAmount = 0; // Default total amount

            const [result1] = await db.promise().query(query1, [
                newServiceId,
                tireBrand,
                internalStructure,
                receiveDate,
                notes,  
                status,
                userId,
                totalAmount
            ]);

            // Second query: Insert into repairing
            const query2 = `
                INSERT INTO repairing (id, patchesApplied, punctureSize, insideDamagePhoto, outsideDamagePhoto) 
                VALUES (?, ?, ?, ?, ?)
            `;
            const [result2] = await db.promise().query(query2, [
                newServiceId,  // Use service_id = 1 as manually set
                patchesApplied,
                punctureSize,
                insideDamagePhoto,
                outsideDamagePhoto
            ]);

            return res.status(200).json({
                message: 'Repair details submitted successfully!',
                serviceId: result1.insertId,  // Should return service ID from `services` table
                repairId: result2.insertId,   // Should return repair ID from `repairing` table
            });
        } catch (error) {
            console.error('Unexpected error:', error);
            return res.status(500).json({ message: 'Unexpected server error.' });
        }
    }
);

// GET Repair Details by ID
router.get('/getRepair/:id', async (req, res) => {
    const repairId = req.params.id;
    try {
        const [rows] = await db.promise().query('SELECT * FROM repairing WHERE id = ?', [repairId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Repair not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error fetching repair details:", error);
        res.status(500).json({ message: 'Server error retrieving repair details' });
    }
});

// Helper function to update repair status (allows changes regardless of current status)
const updateRepairStatus = async (req, res, newStatus, successMessage, errorMessage) => {
    const repairId = req.params.id;
    let query, params;
    
    if (newStatus === 'Rejected' && req.body.note) {
        // Update special_note column with the provided rejection note
        query = "UPDATE repairing SET status = ?, special_note = ? WHERE id = ?";
        params = [newStatus, req.body.note, repairId];
    } else {
        query = "UPDATE repairing SET status = ? WHERE id = ?";
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
        'Approved',
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

// GET Approved Repair Details
router.get('/approvedRepairs', async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM repairing WHERE status = ?', ['Approved']);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching approved repairs:", error);
        res.status(500).json({ message: 'Server error fetching approved repairs' });
    }
});

module.exports = router;
