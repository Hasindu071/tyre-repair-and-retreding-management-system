const CustomerPaymentModel = require('../models/customerPaymentModel');

// Handle saving customer payment
const savePayment = async (req, res) => {
    const { amount, note, serviceamount, deliveryamount, customerId, paymentDate, paymentMethod, orderId } = req.body;

    // Validate input fields
    if (!amount || !note || !serviceamount || !deliveryamount || !customerId || !paymentDate || !paymentMethod || !orderId) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Calculate the net amount
    const amt = parseFloat(amount);
    const srv = parseFloat(serviceamount);
    const del = parseFloat(deliveryamount);
    const NetAmount = amt + srv + del;

    try {
        // Save payment record
        await CustomerPaymentModel.savePayment(amount, deliveryamount, note, NetAmount, paymentDate, paymentMethod, orderId, customerId);

        // Update order payment status
        await CustomerPaymentModel.updateOrderPaymentStatus(orderId);

        res.status(200).json({ success: true, message: 'Payment record saved and order updated successfully.' });
    } catch (error) {
        console.error('Error saving payment record:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// Handle fetching customer payments
const getPayments = async (req, res) => {
    try {
        const [payments] = await CustomerPaymentModel.getPayments();
        res.status(200).json(payments);
    } catch (error) {
        console.error('Error fetching payment records:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

module.exports = {
    savePayment,
    getPayments
};
