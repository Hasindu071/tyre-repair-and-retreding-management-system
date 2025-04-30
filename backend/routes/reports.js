const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Ensure your DB connection exports a promise-based pool

// Revenue Report endpoint
router.get('/revenue', async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: "Start date and end date are required" });
  }

  try {
    const query = `
      SELECT 
        o.order_id,
        CASE
          WHEN o.service_id LIKE 'RP_%' THEN 'Repair'
          WHEN o.service_id LIKE 'RD_%' THEN 'Retreading'
          ELSE 'Unknown'
        END AS serviceType,
        o.total_amount AS revenue,
        o.order_date
      FROM orders o
      WHERE DATE(o.order_date) BETWEEN ? AND ?
        AND o.payment_status = 'Paid'
      ORDER BY o.order_date ASC
    `;
    const [rows] = await db.promise().query(query, [startDate, endDate]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching revenue report:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Attendance & Productivity Report endpoint
router.get('/attendance-productivity', async (req, res) => {
    const { startDate, endDate } = req.query;
  
    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date and end date are required" });
    }
  
    try {
        const query = `
        SELECT 
          w.id AS worker_id,
          CONCAT(w.firstName, ' ', w.lastName) AS worker_name,
          COUNT(DISTINCT a.date) AS days_attended,
          COUNT(DISTINCT o.order_id) AS total_services,
          CASE 
            WHEN COUNT(DISTINCT a.date) = 0 THEN 0
            ELSE (COUNT(DISTINCT o.order_id) / COUNT(DISTINCT a.date)) * 100
          END AS productivity_score
        FROM worker_register w
        LEFT JOIN worker_attendance a 
          ON w.id = a.worker_id 
          AND a.date BETWEEN ? AND ?
        LEFT JOIN orders o 
          ON w.id = o.emp_id 
          AND o.order_date BETWEEN ? AND ?
          AND o.payment_status = 'Paid'
        GROUP BY w.id, w.firstName, w.lastName
        ORDER BY worker_name ASC
      `;
      const [rows] = await db.promise().query(query, [startDate, endDate, startDate, endDate]);
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching attendance-productivity report:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });

module.exports = router;