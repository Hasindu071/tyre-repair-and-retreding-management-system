const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // e.g. 1625239070123.jpg
    }
});
const upload = multer({ storage });

/*// Route to fetch orders
router.get('/getOrders', (req, res) => {
    const query = "SELECT * FROM orders";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Database fetch error:", err);
            return res.status(500).json({ success: false, message: 'Failed to retrieve orders' });
        }
        res.status(200).json(results);
    });
});*/


// Route to fetch workers
router.get('/getWorkers', async (req, res) => {
    try {
        const [workers] = await db.promise().query(
            'SELECT id, CONCAT(firstName, " ", lastName) AS name FROM worker_register WHERE status = ?',
            ['Approved']
        );
        res.status(200).json(workers);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).json({ message: 'Failed to retrieve workers' });
    }
});

router.post('/addOrder', upload.single('orderImage'), async (req, res) => {
    const { customer, task } = req.body;
    try {
        let result;
        if (req.file) {
            const orderImage = `/uploads/${req.file.filename}`;
            [result] = await db.promise().query(
                'INSERT INTO orders (customer, task, image) VALUES (?, ?, ?)', 
                [customer, task, orderImage]
            );
        } else {
            [result] = await db.promise().query(
                'INSERT INTO orders (customer, task) VALUES (?, ?)', 
                [customer, task]
            );
        }
        const newOrder = { 
            id: result.insertId, 
            customer, 
            task, 
            image: req.file ? `/uploads/${req.file.filename}` : undefined 
        };
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Database insert error:', error);
        res.status(500).json({ message: 'Failed to add order' });
    }
});
/*
// Route to assign a worker to an order and update status to "in pending"
router.put('/assignWorker/:id', async (req, res) => {
    const orderId = req.params.id;
    const { assignedWorker } = req.body;
    try {
        await db.promise().query(
            'UPDATE orders SET assignedWorker = ?, status = ? WHERE order_id = ?',
            [assignedWorker, 'in pending', orderId]
        );
        res.status(200).json({ message: 'Worker assigned and status updated to "in pending" successfully' });
    } catch (error) {
        console.error('Database update error:', error);
        res.status(500).json({ message: 'Failed to assign worker' });
    }
}); */


// Endpoint to fetch approved repair orders from the services table with corresponding order details
router.get('/UpdateOrders', async (req, res) => {
  const { workerId } = req.query; // <-- get it from the query params

  if (!workerId) {
    return res.status(400).json({ message: 'Worker ID is required' });
  }

  try {
    const [rows] = await db.promise().query(
      `
      SELECT s.*, o.*
      FROM services s
      JOIN orders o ON s.service_id = o.service_id
      WHERE o.status = 'Pending' AND o.emp_id = ?
      `,
      [workerId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching worker's pending orders:", error);
    res.status(500).json({ message: 'Server error fetching orders', error: error.message });
  }
});


// PUT /Orders/startTask – Mark a task as started (In Progress)
router.put('/startTask', async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT s.*, o.*
      FROM services s
      JOIN orders o ON s.service_id = o.service_id
      WHERE o.status = 'Pending'
    `);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching approved repairs:", error);
    res.status(500).json({ message: 'Server error fetching approved repairs', error: error.message });
  }
});

// PUT /Orders/updateProgress – Update progress and complete task if progress reaches 100%
router.put('/updateProgress', async (req, res) => {
    const { taskId, progress } = req.body;
    const status = progress >= 100 ? 'Completed' : 'In Progress';
    try {
        const [result] = await db.promise().query(
            'UPDATE orders SET progress = ?, status = ? WHERE order_id = ?',
            [progress, status, taskId]
        );
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Order updated successfully", status });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error("Error updating order progress:", error);
        res.status(500).json({ message: "Error updating order progress", error: error.message });
    }
});


// GET /orders/getStartedTasks – Retrieve all tasks that are in progress for a specific worker
router.get('/getStartedTasks', async (req, res) => {
  const { workerId } = req.query;

  if (!workerId) {
    return res.status(400).json({ message: 'Worker ID is required' });
  }

  try {
    const [rows] = await db.promise().query(
      `
      SELECT s.*, o.*
      FROM services s
      JOIN orders o ON s.service_id = o.service_id
      WHERE o.status = 'In Progres' AND o.emp_id = ?
      `,
      [workerId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching started tasks:", error);
    res.status(500).json({ message: 'Server error fetching started tasks', error: error.message });
  }
});



// GET /orders/getMyOrders – Retrieve all orders (or filter by customer if needed)
router.get('/getMyOrders', async (req, res) => {
  try {
      let query = "SELECT * FROM orders";
      const params = [];
      
      // Filter orders by customer id if provided as a query parameter.
      if (req.query.customerId) {
          query += " WHERE customer = ?";
          params.push(req.query.customerId);
      }
      
      const [orders] = await db.promise().query(query, params);
      res.status(200).json(orders);
  } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
});

  // PUT /orders/completeOrder/:id – Mark a specific order as complete
router.put('/completeOrder/:id', async (req, res) => {
    const orderId = req.params.id;
    try {
      // Update the order status to "Completed" and set progress to 100 (if using progress)
      const [result] = await db.promise().query(
        "UPDATE orders SET status = ?, progress = ? WHERE order_id = ?",
        ["Completed", 100, orderId]
      );
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Order updated successfully" });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ message: "Error updating order", error: error.message });
    }
  });

  // Example backend endpoint in orders.js
  router.get('/getCompletedTasks', async (req, res) => {
      const { workerId } = req.query;

  if (!workerId) {
    return res.status(400).json({ message: 'Worker ID is required' });
  }

    try {
      const [rows] = await db.promise().query(`
        SELECT s.*, o.*, 
               c.firstName AS customerFirstName, c.lastName AS customerLastName, 
               w.firstName AS workerFirstName, w.lastName AS workerLastName, 
               s.total_amount AS TotalAmount
        FROM services s
        JOIN orders o ON s.service_id = o.service_id
        JOIN customer_register c ON c.id = s.customer_ID
        JOIN worker_register w ON w.id = o.emp_id
        WHERE o.status = 'Completed' AND o.emp_id = ?
      `, [workerId]);
      
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching approved repairs:", error);
      res.status(500).json({ message: 'Server error fetching approved repairs', error: error.message });
    }
  });

  router.get('/getCompletedTotalAmount0Tasks', async (req, res) => {
    try {
      const [rows] = await db.promise().query(`
        SELECT s.*, o.*, 
               c.firstName AS customerFirstName, c.lastName AS customerLastName, 
               w.firstName AS workerFirstName, w.lastName AS workerLastName, 
               s.total_amount AS TotalAmount
        FROM services s
        JOIN orders o ON s.service_id = o.service_id
        JOIN customer_register c ON c.id = s.customer_ID
        JOIN worker_register w ON w.id = o.emp_id
        WHERE o.status = 'Completed' AND o.payment_status = 'not paid'
      `);
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching approved repairs:", error);
      res.status(500).json({ message: 'Server error fetching approved repairs', error: error.message });
    }
  });

  router.post("/getOrders", async (req, res) => {
    const { customer, task, userID, assignedWorker } = req.body;
  
    const emp_id = assignedWorker;
    const order_date = new Date();
    const progress = "0%";
    const total_amount = task;
    const service_id = customer;
    const user_id = userID;
  
    try {
      // Start transaction
      await db.promise().query("START TRANSACTION");
  
      // Insert into orders table
      const [result] = await db.promise().query(
        `INSERT INTO orders (service_id, emp_id, total_amount, progress, order_date, status, payment_status, own_ID )
         VALUES (?, ?, ?, ?, ?, "Pending", "not paid", ?)`,
        [service_id, emp_id, total_amount, progress, order_date, user_id]
      );
  
      // Update the services table
      await db.promise().query(
        `UPDATE services SET status = "Approved" WHERE service_id = ?`,
        [service_id]
      );
  
      // Commit the transaction
      await db.promise().query("COMMIT");
  
      const newOrder = {
        id: result.insertId,
        customer: service_id,
        task: total_amount,
        assignedWorker: emp_id,
      };
  
      res.status(201).json(newOrder);
    } catch (error) {
      // Rollback on any error
      await db.promise().query("ROLLBACK");
      console.error("Error adding new order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


 // GET /orders/getCustomerOrderStatus – Retrieve orders for a customer
 router.get("/getCustomerOrderStatus", async (req, res) => {
  const customerId = req.query.customerId;

  try {
    if (!customerId) {
      return res.status(400).json({ message: "Customer ID is required" });
    }

    // 1. Get service IDs for the customer using promise()
    // Note: Updated column name to customer_ID to match your table schema.
    const [services] = await db.promise().query(
      "SELECT service_id FROM services WHERE customer_ID = ?",
      [customerId]
    );
    console.log("Services:", services); // Debugging line

    if (!services.length) {
      return res.json([]);
    }

    const serviceIds = services.map((s) => s.service_id);
    console.log("Service IDs:", serviceIds); // Debugging line

    // 2. Get orders using those service IDs using promise()
    const [orders] = await db.promise().query(
      "SELECT order_id, service_id, order_date, status, progress FROM orders WHERE service_id IN (?)",
      [serviceIds]
    );
    console.log("Orders:", orders); // Debugging line

    res.json(orders);
  } catch (error) {
    console.error("Error in getCustomerOrderStatus:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// GET worker task details based on task order id
router.get('/workersTask/:id', async (req, res) => {
  const taskId = req.params.id;
  console.log("Task ID:", taskId); // Debugging line
  try {
    const query = `
      SELECT 
         o.order_id AS order_id,
         o.order_date,
         s.receiveDate,
         w.firstName,
         w.lastName,
        o.status
      FROM orders o
      LEFT JOIN services s ON o.service_id = s.service_id
      LEFT JOIN worker_register w ON o.emp_id = w.id
      WHERE o.emp_id = ?
    `;
    const [rows] = await db.promise().query(query, [taskId]);
    console.log("Worker Task Details:", rows); // Debugging line
    if (rows.length === 0) {
      return res.status(404).json({ message: "Task not found." });
    }
    return res.status(200).json(rows); // ✅ Send full list
  } catch (error) {
    console.error("Error fetching worker task:", error);
    res.status(500).json({ message: "Server error." });
  }
});


// Corrected query in /getWorkerServices endpoint
router.get('/getWorkerServices', async (req, res) => {
  const { year, month } = req.query;

  if (!year || !month || isNaN(year) || isNaN(month)) {
    return res.status(400).json({ message: "Valid year and month are required." });
  }
  console.log("Year:", year, "Month:", month);

  try {
    const query = `
      SELECT 
        w.id AS workerId,
        CONCAT(w.firstName, ' ', w.lastName) AS workerName,
        s.service_id AS serviceId,
        o.total_amount AS serviceCharge,
        o.order_date AS date
      FROM services s
      JOIN orders o ON s.service_id = o.service_id 
      JOIN worker_register w ON o.emp_id = w.id 
      WHERE YEAR(o.order_date) = ? AND MONTH(o.order_date) = ?
    `;

    const [rows] = await db.promise().query(query, [year, month]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No worker services found for the specified year and month." });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching worker services:", error);
    res.status(500).json({ message: "Server error fetching worker services.", error: error.message });
  }
});

// GET /orders/pending-rejected/:customerId
// Retrieves orders for a customer that have a status of "Pending" or "Rejected"
router.get('/pending-rejected/:customerId', async (req, res) => {
    const { customerId } = req.params;
    if (!customerId) {
        return res.status(400).json({ message: "Customer ID is required" });
    }
    try {
        const query = `
            SELECT s.*, o.order_id, o.order_date AS orderDate, r.note
            FROM services s
            LEFT JOIN orders o ON o.service_id = s.service_id
            LEFT JOIN reject_orders r ON r.service_id = s.service_id
            WHERE s.customer_ID = ? 
              AND s.status IN ('Pending', 'Rejected')
        `;
        const [rows] = await db.promise().query(query, [customerId]);
        return res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching pending/rejected orders:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
});

router.get('/getCompletedTasksOwnerShow', async (req, res) => {
    try {
      const [rows] = await db.promise().query(`
        SELECT s.*, o.*, 
               c.firstName AS customerFirstName, c.lastName AS customerLastName, 
               w.firstName AS workerFirstName, w.lastName AS workerLastName, 
               s.total_amount AS TotalAmount
        FROM services s
        JOIN orders o ON s.service_id = o.service_id
        JOIN customer_register c ON c.id = s.customer_ID
        JOIN worker_register w ON w.id = o.emp_id
        WHERE o.status = 'Completed'
      `);
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching approved repairs:", error);
      res.status(500).json({ message: "Server error." });
    }
});

module.exports = router;