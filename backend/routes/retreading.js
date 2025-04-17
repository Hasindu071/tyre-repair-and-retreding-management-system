const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../config/db');

const router = express.Router();

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Submit Retreading Form (updated to match repairing structure)
router.post(
    '/submit',
    upload.fields([{ name: 'insidePhoto' }, { name: 'outsidePhoto' }]),
    async (req, res) => {
        const {
            sizeCode,
            wheelDiameter,
            tireWidth,
            tireBrand,
            tirePattern,
            completionDate,
            tireStructure,
            notes,
            userId
        } = req.body;

        const internalStructure = tireStructure;
        const receiveDate = new Date().toISOString().split('T')[0];

        const insidePhoto = req.files?.insidePhoto
            ? `/uploads/${req.files.insidePhoto[0].filename}`
            : null;
        const outsidePhoto = req.files?.outsidePhoto
            ? `/uploads/${req.files.outsidePhoto[0].filename}`
            : null;

        if (!sizeCode || !wheelDiameter || !tireWidth || !tireBrand || !tirePattern || !completionDate || !tireStructure) {
            return res.status(400).json({ message: 'All required fields must be filled.' });
        }

        try {
            // Generate new service ID for retreading (similar to repairing)
            const [rows] = await db.promise().query(
                'SELECT service_id FROM services WHERE service_id LIKE "RD_%" ORDER BY service_id DESC LIMIT 1'
            );

            let newServiceId = 'RD_00001';
            if (rows.length > 0 && rows[0].service_id) {
                const lastIdNumber = parseInt(rows[0].service_id.split('_')[1]);
                if (!isNaN(lastIdNumber)) {
                    newServiceId = `RD_${(lastIdNumber + 1).toString().padStart(5, '0')}`;
                }
            }

            // Insert into services table
            await db.promise().query(
                `INSERT INTO services (service_id, tireBrand, internalStructure, receiveDate, notes, status, customer_ID, total_amount)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [newServiceId, tireBrand, internalStructure, receiveDate, notes, 'Pending', userId, 0]
            );

            // Insert into retreading table (similar to repairing structure)
            await db.promise().query(
                `INSERT INTO retreading 
                 (id, sizeCode, wheelDiameter, tireWidth, tirePattern, insidePhoto, outsidePhoto)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [newServiceId, sizeCode, wheelDiameter, tireWidth, tirePattern, insidePhoto, outsidePhoto]
            );

            res.status(200).json({ message: 'Retreading form submitted successfully!' });
        } catch (err) {
            console.error('Error submitting retreading:', err);
            res.status(500).json({ message: 'Server error submitting retreading.', error: err.message });
        }
    }
);

// Get Retreading by ID (similar to repair fetching)
router.get('/getRetreading/:id', async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM retreading WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Retreading not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error fetching retreading:", error);
        res.status(500).json({ message: 'Server error fetching retreading.', error: error.message });
    }
});

// Helper function to update retreading status (similar to repairing)
const updateRetreadingStatus = async (req, res, newStatus, successMessage, errorMessage) => {
    const serviceId = req.params.id; // Use the service_id that was generated during retreading submission
    const note = req.body.note;
    let query, params;
    
    if (newStatus === 'Rejected' && note) {
        query = 'UPDATE services SET status = ?, special_note = ? WHERE service_id = ?';
        params = [newStatus, note, serviceId];
    } else {
        query = 'UPDATE services SET status = ? WHERE service_id = ?';
        params = [newStatus, serviceId];
    }
    
    try {
        const [result] = await db.promise().query(query, params);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: successMessage });
        } else {
            res.status(404).json({ message: 'Retreading service not found' });
        }
    } catch (error) {
        console.error(`Error updating retreading service to ${newStatus}:`, error);
        res.status(500).json({ message: errorMessage, error: error.message });
    }
};

// Approve Retreading (similar to repair approval)
router.put('/approveRetreading/:id', (req, res) =>
    updateRetreadingStatus(req, res, 'Checking', 'Retreading approved successfully.', 'Error approving retreading')
);

// Reject Retreading (similar to repair rejection)
router.put('/rejectRetreading/:id', (req, res) =>
    updateRetreadingStatus(req, res, 'Rejected', 'Retreading rejected successfully.', 'Error rejecting retreading')
);

// Get all Approved Retreadings (similar to fetching approved repairs)
router.get('/approvedRetreadings', async (req, res) => {
    try {
        const [rows] = await db.promise().query('SELECT * FROM retreading WHERE status = "Approved"');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching approved retreadings:", error);
        res.status(500).json({ message: 'Server error fetching approved retreadings.' });
    }
});

module.exports = router;
