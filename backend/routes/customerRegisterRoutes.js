const express = require('express');
const router = express.Router();
const CustomerRegisterController = require('../controllers/customerRegisterController');

// POST: Register a new customer or check NIC availability
router.post('/', CustomerRegisterController.registerCustomer);

module.exports = router;
