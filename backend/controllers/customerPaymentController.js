const CustomerPaymentModel = require('../models/customerPaymentModel');

// Handle saving customer payment
const savePayment = async (req, res) => {
    const { amount, note, serviceamount, deliveryamount, customerId, paymentDate, paymentMethod, orderId } = req.body;

    // Validate input fields (all fields are required)
    if (!amount || !note || !serviceamount || !deliveryamount || !customerId || !paymentDate || !paymentMethod || !orderId) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Calculate the net amount
    const amt = parseFloat(amount);
    const srv = parseFloat(serviceamount);
    const del = parseFloat(deliveryamount);
    const NetAmount = amt + srv + del;

    try {
        // Retrieve serviceId using the orderId
        const serviceIdResult = await CustomerPaymentModel.getServiceIdFromOrderId(orderId);
        if(!serviceIdResult[0].length){
            return res.status(400).json({ success: false, message: 'Service not found for the provided orderId.' });
        }
        const serviceId = serviceIdResult[0][0].service_id;

        // Save payment record
        await CustomerPaymentModel.savePayment(amount, deliveryamount, note, NetAmount, paymentDate, paymentMethod, orderId, customerId);

        // Update order payment status
        await CustomerPaymentModel.updateOrderPaymentStatus(orderId);

        // Update service total amount by adding the NetAmount to the current total
        await CustomerPaymentModel.updateServiceTotal(serviceId, NetAmount);

        // Retrieve the updated service total
        const serviceTotalResult = await CustomerPaymentModel.getServiceTotal(serviceId);
        const newServiceTotal = serviceTotalResult[0][0].total_amount;

        // Update the customer payment record so that its net_amount reflects the new service total
        await CustomerPaymentModel.updatePaymentNetAmount(orderId, newServiceTotal);

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