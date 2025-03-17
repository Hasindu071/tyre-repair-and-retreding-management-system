const express = require('express');
const router = express.Router();
const db = require('../config/db'); // ensure this connects to your database

router.post('/mark', (req, res) => {
    const { worker_id } = req.body;
    if (!worker_id) {
        return res.status(400).json({ message: "Worker ID is required." });
    }
    
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().slice(0, 10);
    
    // Check if attendance is already marked
    const checkQuery = "SELECT * FROM worker_attendance WHERE worker_id = ? AND date = ?";
    db.query(checkQuery, [worker_id, today], (err, results) => {
        if (err) {
            console.error("Error checking attendance:", err);
            return res.status(500).json({ message: "Server error." });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: "Attendance already marked for today." });
        }
        
        // Insert attendance record
        const insertQuery = "INSERT INTO worker_attendance (worker_id, date) VALUES (?, ?)";
        db.query(insertQuery, [worker_id, today], (err2, result) => {
            if (err2) {
                console.error("Error marking attendance:", err2);
                return res.status(500).json({ message: "Server error." });
            }
            return res.status(200).json({ message: "Attendance marked successfully!" });
        });
    });
});

module.exports = router;