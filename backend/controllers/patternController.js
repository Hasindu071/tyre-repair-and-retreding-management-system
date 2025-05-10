// controller/patternsController.js
const fs = require('fs');
const path = require('path');
const patternsModel = require('../models/patternModel');

const updatePattern = (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded." });

        const patternNum = req.body.patternNum;
        if (!patternNum) return res.status(400).json({ message: "Pattern number is required." });

        const filePath = `/assets/pattern/${req.file.filename}`;

        patternsModel.replacePattern(patternNum, filePath, (err, results) => {
            if (err) return res.status(500).json({ message: "DB error", error: err });
            return res.status(200).json({ message: "Pattern updated successfully!", filePath });
        });
    } catch (error) {
        return res.status(500).json({ message: "Unexpected error", error: error.message });
    }
};

const getAllPatterns = (req, res) => {
    patternsModel.getAllPatterns((err, results) => {
        if (err) return res.status(500).json({ message: "Error fetching patterns", error: err });

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const patterns = results.map(row => ({
            id: row.id,
            imageUrl: baseUrl + row.imageUrl
        }));
        res.status(200).json(patterns);
    });
};

module.exports = {
    updatePattern,
    getAllPatterns
};
