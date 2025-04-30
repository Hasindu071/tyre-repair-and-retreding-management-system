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

module.exports = router;