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

// Route to fetch orders
router.get('/getOrders', (req, res) => {
    const query = "SELECT * FROM orders";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Database fetch error:", err);
            return res.status(500).json({ success: false, message: 'Failed to retrieve orders' });
        }
        res.status(200).json(results);
    });
});


// Route to fetch workers
router.get('/getWorkers', async (req, res) => {
    try {
        const [workers] = await db.promise().query('SELECT id, CONCAT(firstName, " ", lastName) AS name FROM worker_register');
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

// Route to assign a worker to an order
router.put('/assignWorker/:id', async (req, res) => {
    const orderId = req.params.id;
    const { assignedWorker } = req.body;
    try {
        await db.promise().query('UPDATE orders SET assignedWorker = ? WHERE id = ?', [assignedWorker, orderId]);
        res.status(200).json({ message: 'Worker assigned successfully' });
    } catch (error) {
        console.error('Database update error:', error);
        res.status(500).json({ message: 'Failed to assign worker' });
    }
});

// Endpoint to fetch approved repair orders from the services table with corresponding order details
router.get('/UpdateOrders', async (req, res) => {
    try {
      const [rows] = await db.promise().query(`
        SELECT s.*, o.*
        FROM services s
        JOIN orders o ON s.service_id = o.service_id
        WHERE s.status = 'Approved'
      `);
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching approved repairs:", error);
      res.status(500).json({ message: 'Server error fetching approved repairs', error: error.message });
    }
});

// PUT /Orders/startTask – Mark a task as started (In Progress)
router.put('/startTask', async (req, res) => {
    const { taskId } = req.body;
    try {
        const [result] = await db.promise().query(
            'UPDATE orders SET status = ? WHERE id = ?',
            ['In Progress', taskId]
        );
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Task started successfully" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error("Error starting task:", error);
        res.status(500).json({ message: "Error starting task", error: error.message });
    }
});

// PUT /Orders/updateProgress – Update progress and complete task if progress reaches 100%
router.put('/updateProgress', async (req, res) => {
    const { taskId, progress } = req.body;
    const status = progress >= 100 ? 'Completed' : 'In Progress';
    try {
        const [result] = await db.promise().query(
            'UPDATE orders SET progress = ?, status = ? WHERE id = ?',
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

router.get('/getStartedTasks', async (req, res) => {
    try {
        // Assuming your orders table has a 'status' column where started tasks have status 'In Progress'
        const [rows] = await db.promise().query(
            "SELECT id, progress, status FROM orders WHERE status = 'In Progress'"
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching started tasks:", error);
        res.status(500).json({ message: "Failed to fetch started tasks", error: error.message });
    }
});


// GET /orders/getMyOrders – Retrieve all orders (or filter by customer if needed)
router.get('/getMyOrders', async (req, res) => {
    try {
      // Optionally, you can filter by customer id if provided as a query parameter
      // For now, we return all orders.
      const [orders] = await db.promise().query("SELECT * FROM orders");
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
        "UPDATE orders SET status = ?, progress = ? WHERE id = ?",
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
    try {
      const [tasks] = await db.promise().query("SELECT id, task, customer FROM orders WHERE status = 'Completed'");
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
      res.status(500).json({ message: "Failed to fetch completed tasks", error: error.message });
    }
  });

  router.post("/getOrders", async (req, res) => {
    const { customer, task, assignedWorker } = req.body;
  
    try {
      const emp_id = assignedWorker;
      const order_date = new Date();
      const progress = "0%";
      const total_amount = task;
      const service_id = customer;
  
      const [result] = await db.promise().query(
        `INSERT INTO orders (service_id, emp_id, total_amount, progress, order_date)
         VALUES (?, ?, ?, ?, ?)`,
        [service_id, emp_id, total_amount, progress, order_date]
      );
  
      const newOrder = {
        id: result.insertId,
        customer: service_id,
        task: total_amount,
        assignedWorker: emp_id,
      };
  
      res.status(201).json(newOrder);
    } catch (error) {
      console.error("Error adding new order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
module.exports = router;