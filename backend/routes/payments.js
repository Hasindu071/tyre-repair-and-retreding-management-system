const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// Route to fetch all payments
router.get('/getPayments', async (req, res) => {
    try {
        const [payments] = await db.promise().execute('SELECT * FROM worker_payments');
        res.status(200).json(payments);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).json({ message: 'Failed to retrieve payments' });
    }
});

// Route to add a new payment
router.post('/addPayment', async (req, res) => {
    const { customer, amount, date, status } = req.body;

    try {
        const query = 'INSERT INTO worker_payments (customer, amount, date, status) VALUES (?, ?, ?, ?)';
        await db.promise().execute(query, [customer, amount, date, status]);
        res.status(201).json({ message: 'Payment added successfully' });
    } catch (error) {
        console.error('Database insert error:', error);
        res.status(500).json({ message: 'Failed to add payment' });
    }
});

module.exports = router;