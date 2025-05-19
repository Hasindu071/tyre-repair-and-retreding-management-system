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


  router.get('/dailyOrdersSummary', async (req, res) => {
    const { startDate } = req.query;
    if (!startDate) {
        return res.status(400).json({ message: "startDate query parameter is required" });
    }

    try {
        const query = `
            SELECT 
                DATE(order_date) AS date,
                COUNT(*) AS totalOrders,
                IFNULL(SUM(total_amount), 0) AS totalRevenue,
                IFNULL(AVG(progress), 0) AS averageProgress
            FROM orders
            WHERE DATE(order_date) = ?
            GROUP BY DATE(order_date)
        `;

        const [rows] = await db.promise().query(query, [startDate]);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching daily orders summary:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// GET /reports/serviceCompletion
router.get('/serviceCompletion', async (req, res) => {
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date and end date are required" });
  }
  
  try {
      // Query completed orders between the given dates.
      const completedQuery = `
          SELECT order_id AS orderId, DATE(order_date) AS date
          FROM orders
          WHERE status = 'Completed'
            AND DATE(order_date) BETWEEN ? AND ?
      `;
      const [completedOrders] = await db.promise().query(completedQuery, [startDate, endDate]);

      // Query in-progress orders (orders not marked as 'Completed') between the given dates.
      const inProgressQuery = `
          SELECT order_id AS orderId, DATE(order_date) AS date
          FROM orders
          WHERE status <> 'Completed'
            AND DATE(order_date) BETWEEN ? AND ?
      `;
      const [inProgressOrders] = await db.promise().query(inProgressQuery, [startDate, endDate]);

      res.status(200).json({
          completed: completedOrders,
          inProgress: inProgressOrders
      });
  } catch (error) {
      console.error("Error fetching service completion report:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /reports/workerPerformance
// This endpoint fetches the performance of workers based on the number of orders handled, average turnaround time, and ratings.
router.get('/workerPerformance', async (req, res) => {
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date and end date are required" });
  }
  
  try {
      const query = `
          SELECT 
              w.id AS workerId,
              CONCAT(w.firstName, ' ', w.lastName) AS workerName,
              COUNT(o.order_id) AS totalOrders,
              0 AS averageTurnaroundTime
          FROM worker_register w
          LEFT JOIN orders o
              ON w.id = o.emp_id
              AND DATE(o.order_date) BETWEEN ? AND ?
          GROUP BY w.id, w.firstName, w.lastName
          ORDER BY workerName ASC
      `;
      const [rows] = await db.promise().query(query, [startDate, endDate]);
      res.status(200).json(rows);
  } catch (error) {
      console.error("Error fetching worker performance report:", error);
      res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /reports/cancellation-refunds
// This endpoint fetches the cancellation report, including order ID, reason for cancellation, and date of cancellation.
router.get('/cancellation-refunds', async (req, res) => {
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
    return res.status(400).json({ message: "Start date and end date are required" });
  }
  
  try {
    const query = `
      SELECT 
          s.service_id AS serviceId,
          r.note AS reason,
          DATE(r.reject_date) AS date
      FROM services s
      INNER JOIN reject_orders r ON s.service_id = r.service_id
      WHERE DATE(r.reject_date) BETWEEN ? AND ?
      ORDER BY r.reject_date ASC
    `;
    const [rows] = await db.promise().query(query, [startDate, endDate]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching cancellation report:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET /reports/inventoryPartsUsage
router.get('/inventoryPartsUsage', async (req, res) => {
  const { startDate, endDate } = req.query;
  
  if (!startDate || !endDate) {
    return res.status(400).json({ message: "Start date and end date are required" });
  }
  
  try {
    const query = `
      SELECT 
          p.name AS productName,
          i.decrease_date AS date,
          w.firstName AS workerFirstName,
          w.lastName AS workerLastName,
          SUM(i.decrease_amount) AS totalQuantityUsed
      FROM worker_stock_decreases i
      JOIN products p ON i.product_id = p.id
      JOIN worker_register w ON i.worker_id = w.id
      WHERE DATE(i.decrease_date) BETWEEN ? AND ?
      GROUP BY p.name, w.firstName, w.lastName
      ORDER BY p.name ASC
    `;
    const [rows] = await db.promise().query(query, [startDate, endDate]);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching inventory report:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;