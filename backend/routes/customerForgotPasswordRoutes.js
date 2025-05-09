const express = require('express');
const router = express.Router();
const CustomerForgotPasswordController = require('../controllers/customerForgotPasswordController');

// POST: Forgot Password
router.post('/forgot-password', CustomerForgotPasswordController.forgotPassword);

// POST: Reset Password
router.post('/reset-password/:token', CustomerForgotPasswordController.resetPassword);

module.exports = router;
