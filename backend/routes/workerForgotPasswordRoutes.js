const express = require('express');
const router = express.Router();
const {
    forgotPassword,
    resetPassword
} = require('../controller/workerForgotPasswordController');

// POST: Send reset link
router.post('/forgot-password', forgotPassword);

// POST: Handle password reset with token
router.post('/reset-password/:token', resetPassword);

module.exports = router;
