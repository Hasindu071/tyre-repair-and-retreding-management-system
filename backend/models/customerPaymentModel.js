const db = require('../config/db');

// Save customer payment to the database
const savePayment = (amount, deliveryFee, note, netAmount, paymentDate, paymentMethod, orderId, customerId) => {
    const query = 'INSERT INTO customer_payments (amount, delivery_fee, note, net_amount, payment_date, payment_method, order_id, customer_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    return db.promise().execute(query, [amount, deliveryFee, note, netAmount, paymentDate, paymentMethod, orderId, customerId]);
};

// Update order payment status to "Paid"
const updateOrderPaymentStatus = (orderId) => {
    const query = 'UPDATE orders SET payment_status = ? WHERE order_id = ?';
    return db.promise().execute(query, ['Paid', orderId]);
};

// Fetch all customer payments
const getPayments = () => {
    const query = 'SELECT * FROM customer_payments';
    return db.promise().execute(query);
};

module.exports = {
    savePayment,
    updateOrderPaymentStatus,
    getPayments
};
