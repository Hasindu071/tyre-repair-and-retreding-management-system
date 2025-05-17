const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Make sure your db is correctly configured

// POST endpoint to mark attendance
router.post('/mark', (req, res) => {
  const { worker_id, date } = req.body;
  if (!worker_id || !date) {
    return res.status(400).json({ message: "Worker ID and date are required." });
  }
  
  // Use the provided date instead of defaulting to today
  const dateToMark = date;
  
  // Check if attendance is already marked for this worker on the provided date
  const checkQuery = "SELECT * FROM worker_attendance WHERE worker_id = ? AND date = ?";
  db.query(checkQuery, [worker_id, dateToMark], (err, results) => {
    if (err) {
      console.error("Error checking attendance:", err);
      return res.status(500).json({ message: "Server error." });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: "Attendance already marked for this day." });
    }
    // Insert the attendance record using the provided date
    const insertQuery = "INSERT INTO worker_attendance (worker_id, date) VALUES (?, ?)";
    db.query(insertQuery, [worker_id, dateToMark], (err2, result) => {
      if (err2) {
        console.error("Error marking attendance:", err2);
        return res.status(500).json({ message: "Server error." });
      }
      return res.status(200).json({ message: "Attendance marked successfully!" });
    });
  });
});

// GET endpoint to fetch a worker's attendance history
router.get('/worker/:id', (req, res) => {
    const worker_id = req.params.id;
    const getQuery = "SELECT date FROM worker_attendance WHERE worker_id = ? ORDER BY date ASC";
    db.query(getQuery, [worker_id], (err, results) => {
        if (err) {
            console.error("Error fetching attendance:", err);
            return res.status(500).json({ message: "Server error." });
        }
        // Map results to an array of date strings
        const attendances = results.map(row => row.date);
        return res.status(200).json({ attendances });
    });
});


// GET endpoint to fetch a worker's attendance records for a specific month and year
router.get('/workerAttend/:id', (req, res) => {
    const workerId = req.params.id;
    const { year, month } = req.query;
    
    if (!year || !month) {
      return res.status(400).json({ message: "Year and month are required as query parameters." });
    }
    
    const query = `
      SELECT date 
      FROM worker_attendance 
      WHERE worker_id = ? 
        AND YEAR(date) = ? 
        AND MONTH(date) = ?
      ORDER BY date ASC
    `;
    
    db.query(query, [workerId, year, month], (err, results) => {
      if (err) {
        console.error("Error fetching attendance:", err);
        return res.status(500).json({ message: "Server error." });
      }
      
      const attendances = results.map(row => row.date.toISOString().slice(0, 10));
      return res.status(200).json({ attendances });
    });
  });

module.exports = router;