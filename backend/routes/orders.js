const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// Route to fetch orders
router.get('/getOrders', async (req, res) => {
    try {
        const [orders] = await db.promise().query('SELECT * FROM orders');
        res.status(200).json(orders);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).json({ message: 'Failed to retrieve orders' });
    }
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

// Route to add a new order
router.post('/addOrder', async (req, res) => {
    const { customer, task } = req.body;
    try {
        const [result] = await db.promise().query('INSERT INTO orders (customer, task) VALUES (?, ?)', [customer, task]);
        const newOrder = { id: result.insertId, customer, task };
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