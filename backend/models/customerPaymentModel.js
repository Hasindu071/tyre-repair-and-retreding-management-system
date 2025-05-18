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

// Get service ID from an order
const getServiceIdFromOrderId = (orderId) => {
    const query = 'SELECT service_id FROM orders WHERE order_id = ?';
    return db.promise().execute(query, [orderId]);
};

// Update service total amount by adding the new net amount
const updateServiceTotal = (serviceId, netAmount) => {
    const query = 'UPDATE services SET total_amount = total_amount + ? WHERE service_id = ?';
    return db.promise().execute(query, [netAmount, serviceId]);
};

// Retrieve the current total_amount from services table
const getServiceTotal = (serviceId) => {
    const query = 'SELECT total_amount FROM services WHERE service_id = ?';
    return db.promise().execute(query, [serviceId]);
};

// Update the customer payment record so that net_amount equals the service total amount
const updatePaymentNetAmount = (orderId, newNetAmount) => {
    const query = 'UPDATE customer_payments SET net_amount = ? WHERE order_id = ?';
    return db.promise().execute(query, [newNetAmount, orderId]);
};

// Fetch all customer payments
const getPayments = () => {
    const query = 'SELECT * FROM customer_payments';
    return db.promise().execute(query);
};

module.exports = {
    savePayment,
    updateOrderPaymentStatus,
    getServiceIdFromOrderId,
    updateServiceTotal,
    getServiceTotal,
    updatePaymentNetAmount,
    getPayments
};