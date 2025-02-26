const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../config/db'); // Import database connection

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Submit or update repair service
router.post('/submit', upload.fields([{ name: 'insideDamagePhoto' }, { name: 'outsideDamagePhoto' }]), async (req, res) => {
    try {
        const { patchesApplied, punctureSize, tireBrand, internalStructure, receiveDate, notes } = req.body;
        const insideDamagePhoto = req.files.insideDamagePhoto ? req.files.insideDamagePhoto[0].filename : null;
        const outsideDamagePhoto = req.files.outsideDamagePhoto ? req.files.outsideDamagePhoto[0].filename : null;

        if (!patchesApplied || !punctureSize || !tireBrand || !internalStructure || !receiveDate) {
            return res.status(400).json({ message: 'All required fields must be filled.' });
        }

        const query = 'INSERT INTO repairing (patchesApplied, punctureSize, tireBrand, internalStructure, receiveDate, notes, insideDamagePhoto, outsideDamagePhoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [patchesApplied, punctureSize, tireBrand, internalStructure, receiveDate, notes, insideDamagePhoto, outsideDamagePhoto], (err, results) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ message: 'Server error while submitting the repair data.' });
            }
            return res.status(200).json({ message: 'Repair details submitted successfully!' });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ message: 'Unexpected server error.' });
    }
});

module.exports = router;