const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// Route to save customer payment
router.post('/savePayment', async (req, res) => {
    const { customerName, amount, paymentDate, paymentMethod } = req.body;

    if (!customerName || !amount || !paymentDate || !paymentMethod) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        const query = 'INSERT INTO customer_payments (customer_name, amount, payment_date, payment_method) VALUES (?, ?, ?, ?)';
        await db.promise().execute(query, [customerName, amount, paymentDate, paymentMethod]);
        res.status(201).json({ success: true, message: 'Payment record saved successfully.' });
    } catch (error) {
        console.error('Error saving payment record:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// Route to get customer payments
router.get('/getPayments', async (req, res) => {
    try {
        const [payments] = await db.promise().execute('SELECT * FROM customer_payments');
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error fetching payment records:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;