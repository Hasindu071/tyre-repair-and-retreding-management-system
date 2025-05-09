const express = require('express');
const router = express.Router();
const { getAllCustomers } = require('../controllers/showCustomerController');

router.get('/customers', getAllCustomers);

module.exports = router;
