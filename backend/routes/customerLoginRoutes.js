const express = require('express');
const router = express.Router();
const customerLoginController = require('../controllers/customerLoginController');

router.post('/login', customerLoginController.loginCustomer);

module.exports = router;
