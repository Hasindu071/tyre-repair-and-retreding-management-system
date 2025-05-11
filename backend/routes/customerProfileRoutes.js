const express = require('express');
const router = express.Router();
const CustomerProfileController = require('../controllers/customerProfileController');

// GET: Retrieve customer profile by ID
router.get('/getProfile/:id', CustomerProfileController.getCustomerProfile);

// PUT: Update customer profile
router.put('/:id', CustomerProfileController.updateCustomerProfile);

// DELETE: Delete customer profile
router.delete('/:id', CustomerProfileController.deleteCustomerProfile);

//get all customer profiles
router.get('/getAll', CustomerProfileController.getAllCustomerProfiles);

module.exports = router;
