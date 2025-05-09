const express = require('express');
const router = express.Router();
const PaymentsController = require('../controllers/paymentsController');

// Define routes
router.get('/getPayments', PaymentsController.getAllPayments);
router.post('/addPayment', PaymentsController.addPayment);
router.put('/updatePayment/:id', PaymentsController.updatePayment);
router.get('/latest/:customerId', PaymentsController.getLatestPayment);
router.get('/getWorkerPayments/:workerId', PaymentsController.getWorkerPayments);

module.exports = router;
