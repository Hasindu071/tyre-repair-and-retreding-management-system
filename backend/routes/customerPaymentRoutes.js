const express = require('express');
const router = express.Router();
const CustomerPaymentController = require('../controllers/customerPaymentController');

// POST: Save customer payment
router.post('/savePayment', CustomerPaymentController.savePayment);

// GET: Get all customer payments
router.get('/getPayments', CustomerPaymentController.getPayments);

module.exports = router;
