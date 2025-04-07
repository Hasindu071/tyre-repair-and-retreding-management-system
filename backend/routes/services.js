const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// Route to fetch all repair services
router.get('/getRepairs', async (req, res) => {
    try {
        const [repairs] = await db.promise().query(`
            SELECT r.*, s.tireBrand, s.internalStructure, s.receiveDate, s.notes, s.status AS serviceStatus, s.customer_ID, s.total_amount
            FROM repairing r
            JOIN services s ON r.id = s.service_id
        `);
        res.status(200).json(repairs);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).json({ message: 'Failed to retrieve repair services' });
    }
});

// Route to fetch all retreading services
router.get('/getRetreadings', async (req, res) => {
    try {
        const [retreadings] = await db.promise().query(`
            SELECT 
                r.*, 
                s.tireBrand, 
                s.internalStructure, 
                s.receiveDate, 
                s.notes, 
                s.status AS serviceStatus, 
                s.customer_ID, 
                s.total_amount
            FROM retreading r
            JOIN services s ON r.id = s.service_id
        `);
        res.status(200).json(retreadings);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).json({ message: 'Failed to retrieve retreading services', error: error.message });
    }
});

// Endpoint to fetch approved repair orders from the services table
router.get('/approvedOrders', async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT * FROM services 
      WHERE status = 'Approved'
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching approved repairs:", error);
    res.status(500).json({ message: 'Server error fetching approved repairs', error: error.message });
  }
});


// Endpoint to fetch all service details for the approved orders
router.get('/getAssignedOrders', async (req, res) => {
  try {
    const [orders] = await db.promise().query(`
      SELECT o.*, s.service_id, s.status AS service_status, s.receiveDate, s.notes, s.tireBrand, s.internalStructure 
      FROM orders o
      JOIN services s ON o.service_id = s.service_id
      WHERE s.status = 'Approved'
    `);

    // Fetch corresponding repair or retreading details based on service_id
    const detailedOrders = await Promise.all(orders.map(async (order) => {
      let serviceDetails = {};
      if (order.service_id.startsWith('RD')) {
        // Fetch retreading details using the "id" column from retreading table
        const [retreadingDetails] = await db.promise().query(`
          SELECT * FROM retreading r WHERE r.id = ?
        `, [order.service_id]);
        serviceDetails = retreadingDetails[0];
      } else if (order.service_id.startsWith('RP')) {
        // Fetch repair details using the "id" column from repairing table
        const [repairDetails] = await db.promise().query(`
          SELECT * FROM repairing r WHERE r.id = ?
        `, [order.service_id]);
        serviceDetails = repairDetails[0];
      }
      return {
        ...order,
        serviceDetails
      };
    }));

    res.status(200).json(detailedOrders);
  } catch (error) {
    console.error("Error fetching approved orders:", error);
    res.status(500).json({ message: 'Server error fetching approved orders', error: error.message });
  }
});


// Route to fetch pending repair services
router.get('/getPendingRepairs', async (req, res) => {
  try {
      const [repairs] = await db.promise().query(`
          SELECT r.*, s.tireBrand, s.internalStructure, s.receiveDate, s.notes, s.status AS serviceStatus, s.customer_ID, s.total_amount
          FROM repairing r
          JOIN services s ON r.id = s.service_id
          WHERE s.status = 'Pending'
      `);
      res.status(200).json(repairs);
  } catch (error) {
      console.error('Database fetch error:', error);
      res.status(500).json({ message: 'Failed to retrieve repair services' });
  }
});

// Route to fetch Pending retreading services
router.get('/getPendingRetreadings', async (req, res) => {
  try {
      const [retreadings] = await db.promise().query(`
          SELECT 
              r.*, 
              s.tireBrand, 
              s.internalStructure, 
              s.receiveDate, 
              s.notes, 
              s.status AS serviceStatus, 
              s.customer_ID, 
              s.total_amount
          FROM retreading r
          JOIN services s ON r.id = s.service_id
          WHERE s.status = 'Pending'
      `);
      res.status(200).json(retreadings);
  } catch (error) {
      console.error('Database fetch error:', error);
      res.status(500).json({ message: 'Failed to retrieve retreading services', error: error.message });
  }
});

  
module.exports = router;