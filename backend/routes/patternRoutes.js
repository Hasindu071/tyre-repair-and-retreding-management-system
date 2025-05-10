const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require('../config/db'); // ensure this connects to your database

// Configure multer storage — adjust the destination as needed.
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Define the folder path
        const dir = path.join(__dirname, '../assets/pattern');
        // Check if the directory exists; create it if not.
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function(req, file, cb) {
        const patternNum = req.body.patternNum;
        const ext = path.extname(file.originalname);
        cb(null, `pattern${patternNum}${ext}`);
    }
});

const upload = multer({ storage });

// POST /patterns/update – Update a tire pattern image and store its path in the database
router.post('/update', upload.single("image"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded." });
        }
        const patternNum = req.body.patternNum;
        if (!patternNum) {
            return res.status(400).json({ message: "Pattern number is required." });
        }
        // Construct the file path relative to your public folder or URL
        const filePath = `/assets/pattern/${req.file.filename}`;

        // REPLACE INTO will update an existing record or insert a new one if not present
        const query = "REPLACE INTO tire_patterns (pattern_num, image_path) VALUES (?, ?)";
        db.query(query, [patternNum, filePath], (err, results) => {
            if (err) {
                console.error("Error updating tire pattern image:", err);
                return res.status(500).json({ message: "Server error updating the database.", error: err });
            }
            return res.status(200).json({ message: "Pattern updated successfully!", filePath });
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ message: "Unexpected server error.", error: error.message });
    }
});

// GET /patterns/getAll – Retrieve all tire patterns from the tire_patterns table
router.get('/getAll', (req, res) => {
    const query = "SELECT pattern_num AS id, image_path AS imageUrl FROM tire_patterns";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching tire patterns:", err);
            return res.status(500).json({ message: "Error fetching tire patterns", error: err });
        }
        // Prepend base URL to image path
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const patterns = results.map(row => ({
            id: row.id,
            imageUrl: baseUrl + row.imageUrl
        }));
        return res.status(200).json(patterns);
    });
});

module.exports = router;