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

// Route to add a new order with optional photo upload
router.post('/addOrder', upload.single('orderImage'), async (req, res) => {
    const { customer, task } = req.body;
    const orderImage = req.file ? `/uploads/${req.file.filename}` : null;
    try {
        // Ensure your orders table has the "image" column if you plan to store the path.
        const [result] = await db.promise().query(
            'INSERT INTO orders (customer, task, image) VALUES (?, ?, ?)', 
            [customer, task, orderImage]
        );
        const newOrder = { id: result.insertId, customer, task, image: orderImage };
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

module.exports = router;