const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../config/db'); // Import the db connection

const router = express.Router();

// Set up multer for file uploads
const uploadDir = path.join(__dirname, '../uploads');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

console.log("Uploads directory: ", uploadDir);

// Multer disk storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(`Saving file to: ${uploadDir}`);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Retreading form submission route
router.post('/submit', upload.fields([{ name: 'insidePhoto' }, { name: 'outsidePhoto' }]), (req, res) => {
    console.log("Received files:", req.files);  // Log the received files

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
            return res.status(500).json({ message: 'Server error.', error: err });
        }
        res.status(200).json({ message: 'Form submitted successfully!' });
    });
});

module.exports = router;
