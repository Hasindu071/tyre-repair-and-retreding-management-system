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
router.post(
    '/submit',
    upload.fields([{ name: 'insidePhoto' }, { name: 'outsidePhoto' }]),
    (req, res) => {
        console.log("Received files:", req.files);
        const {
            sizeCode,
            wheelDiameter,
            tireWidth,
            tireBrand,
            tirePattern,
            completionDate,
            tireStructure,
            notes
        } = req.body;

        // If files are uploaded, prefix the file name with "/uploads/"
        const insidePhoto = req.files.insidePhoto 
            ? `/uploads/${req.files.insidePhoto[0].filename}` 
            : null;
        const outsidePhoto = req.files.outsidePhoto 
            ? `/uploads/${req.files.outsidePhoto[0].filename}` 
            : null;

        // Validate required fields
        if (
            !sizeCode || 
            !wheelDiameter || 
            !tireWidth || 
            !tireBrand || 
            !tirePattern || 
            !completionDate || 
            !tireStructure
        ) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const query = `INSERT INTO retreading 
            (sizeCode, wheelDiameter, tireWidth, tireBrand, tirePattern, completionDate, tireStructure, notes, insidePhoto, outsidePhoto, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')`;

        db.query(
            query,
            [
                sizeCode,
                wheelDiameter,
                tireWidth,
                tireBrand,
                tirePattern,
                completionDate,
                tireStructure,
                notes,
                insidePhoto,
                outsidePhoto
            ],
            (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    return res.status(500).json({ message: 'Server error.', error: err });
                }
                res.status(200).json({ message: 'Form submitted successfully!' });
            }
        );
    }
);

// GET Retreading Details by ID
router.get('/getRetreading/:id', async (req, res) => {
    const retreadingId = req.params.id;
    try {
        const [rows] = await db.promise().query('SELECT * FROM retreading WHERE id = ?', [retreadingId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Retreading not found' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Error fetching retreading details:", error);
        res.status(500).json({ message: 'Server error retrieving retreading details' });
    }
});

module.exports = router;