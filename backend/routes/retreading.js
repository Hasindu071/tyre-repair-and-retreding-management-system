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

// Retreading form submission route
router.post('/submit', upload.fields([{ name: 'insidePhoto' }, { name: 'outsidePhoto' }]), (req, res) => {
    const { sizeCode, wheelDiameter, tireWidth, tireBrand, tirePattern, completionDate, tireStructure, notes } = req.body;
    const insidePhoto = req.files.insidePhoto ? req.files.insidePhoto[0].filename : null;
    const outsidePhoto = req.files.outsidePhoto ? req.files.outsidePhoto[0].filename : null;

    if (!sizeCode || !wheelDiameter || !tireWidth || !tireBrand || !tirePattern || !completionDate || !tireStructure) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const query = 'INSERT INTO retreading (sizeCode, wheelDiameter, tireWidth, tireBrand, tirePattern, completionDate, tireStructure, notes, insidePhoto, outsidePhoto) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [sizeCode, wheelDiameter, tireWidth, tireBrand, tirePattern, completionDate, tireStructure, notes, insidePhoto, outsidePhoto], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Server error.' });
        }
        res.status(200).json({ message: 'Form submitted successfully!' });
    });
});

module.exports = router;