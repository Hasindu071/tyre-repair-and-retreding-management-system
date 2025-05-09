const path = require('path');
const fs = require('fs');
const patternModel = require('../models/patternModel');

exports.updatePattern = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        const patternNum = req.body.patternNum;
        if (!patternNum) {
            return res.status(400).json({ message: "Pattern number is required." });
        }

        const filePath = `/assets/pattern/${req.file.filename}`;
        await patternModel.replacePattern(patternNum, filePath);

        return res.status(200).json({ message: "Pattern updated successfully!", filePath });
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ message: "Unexpected server error.", error: error.message });
    }
};

exports.getAllPatterns = async (req, res) => {
    try {
        const results = await patternModel.fetchAllPatterns();
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        const patterns = results.map(row => ({
            id: row.id,
            imageUrl: baseUrl + row.imageUrl
        }));

        return res.status(200).json(patterns);
    } catch (err) {
        console.error("Error fetching tire patterns:", err);
        return res.status(500).json({ message: "Error fetching tire patterns", error: err });
    }
};
