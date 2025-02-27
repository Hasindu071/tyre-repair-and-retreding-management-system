const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// Route to fetch all orders
router.get('/getOrders', async (req, res) => {
    try {
        const [repairs] = await db.promise().execute('SELECT * FROM repairing');
        const [retreadings] = await db.promise().execute('SELECT * FROM retreading');
        const orders = [...repairs, ...retreadings];
        res.status(200).json(orders);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).json({ message: 'Failed to retrieve orders' });
    }
});

// Route to fetch all workers
router.get('/getWorkers', async (req, res) => {
    try {
        const [workers] = await db.promise().execute('SELECT * FROM worker_register');
        res.status(200).json(workers);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).json({ message: 'Failed to retrieve workers' });
    }
});

// Route to update assigned worker for an order
router.put('/assignWorker/:id', async (req, res) => {
    const orderId = req.params.id;
    const { assignedWorker } = req.body;

    try {
        const query = 'UPDATE orders SET assignedWorker = ? WHERE id = ?';
        await db.promise().execute(query, [assignedWorker, orderId]);
        res.status(200).json({ message: 'Worker assigned successfully' });
    } catch (error) {
        console.error('Database update error:', error);
        res.status(500).json({ message: 'Failed to assign worker' });
    }
});

module.exports = router;