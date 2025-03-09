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

router.get("/orders", async (req, res) => {
    try {
        const [rows] = await db.promise().query("SELECT * FROM orders");
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Failed to fetch orders", error: error });
    }
});


// GET /Orders/orders – Retrieve tasks assigned to a specific worker
router.get('/orders', async (req, res) => {
    try {
        const { workerId } = req.query;
        if (!workerId) {
            return res.status(400).json({ message: "workerId query parameter is required." });
        }
        // Adjust the column name "assignedWorker" if different in your database schema
        const query = "SELECT id, task, customer FROM orders WHERE assignedWorker = ?";
        const [rows] = await db.promise().execute(query, [workerId]);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
    }
});

// PUT /Orders/updateProgress – Update the progress of an order (task)
router.put('/updateProgress', async (req, res) => {
    const { taskId, progress } = req.body;
    try {
        const [result] = await db.promise().query(
            'UPDATE orders SET progress = ? WHERE id = ?',
            [progress, taskId]
        );
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "Order progress updated successfully" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error("Error updating order progress:", error);
        res.status(500).json({ message: "Error updating order progress", error: error.message });
    }
});

module.exports = router;