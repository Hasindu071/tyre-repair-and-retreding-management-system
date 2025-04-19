const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// Route to save customer payment
router.post('/savePayment', async (req, res) => {
    const { amount, note, serviceamount, deliveryamount, customerId,  paymentDate, paymentMethod, orderId } = req.body;

    if (!amount || !note || !serviceamount || !deliveryamount || !customerId || !paymentDate || !paymentMethod || !orderId) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const amt = parseFloat(amount);
    const srv = parseFloat(serviceamount);
    const del = parseFloat(deliveryamount);

const NetAmount = amt + srv + del;
    try {
        // Save the payment record in customer_payments table
        const query = 'INSERT INTO customer_payments ( amount, delivery_fee, note, net_amount, payment_date, payment_method, order_id, customer_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        await db.promise().execute(query, [amount, deliveryamount, note, NetAmount, paymentDate, paymentMethod, orderId, customerId]);

        // Update the corresponding service record's total_amount column
        //const updateQuery = 'UPDATE services SET total_amount = ? WHERE service_id = ?';
        //await db.promise().execute(updateQuery, [amount, serviceId]);

        res.status(200).json({ success: true, message: 'Payment record saved and service updated successfully.' });
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