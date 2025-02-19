const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the db connection
const multer = require('multer');
const path = require('path');

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

// Repairing form submission route
router.post('/submit', upload.fields([{ name: 'insideDamagePhoto' }, { name: 'outsideDamagePhoto' }]), (req, res) => {
    const { patchesApplied, punctureSize, tireBrand, internalStructure, receiveDate, notes } = req.body;
    const insideDamagePhoto = req.files.insideDamagePhoto ? req.files.insideDamagePhoto[0].filename : null;
    const outsideDamagePhoto = req.files.outsideDamagePhoto ? req.files.outsideDamagePhoto[0].filename : null;

    if (!patchesApplied || !punctureSize || !tireBrand || !internalStructure || !receiveDate) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const query = 'INSERT INTO repairing (patchesApplied, punctureSize, tireBrand, internalStructure, receiveDate, notes, insideDamagePhoto, outsideDamagePhoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [patchesApplied, punctureSize, tireBrand, internalStructure, receiveDate, notes, insideDamagePhoto, outsideDamagePhoto], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Server error.' });
        }
        res.status(200).json({ message: 'Form submitted successfully!' });
    });
});

module.exports = router;