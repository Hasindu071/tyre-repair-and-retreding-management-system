const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const CustomerForgotPasswordModel = require('../models/customerForgotPasswordModel');
require('dotenv').config();

// Configure Nodemailer transporter (using Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,    // e.g., "your-email@gmail.com"
        pass: process.env.EMAIL_PASS     // your Gmail app password
    }
});

// Customer Forgot Password Handler
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required.' });
        }

        // Check if the customer exists in the database
        const [results] = await CustomerForgotPasswordModel.findCustomerByEmail(email);

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'No account found with that email.' });
        }

        const customer = results[0];

        // Generate a reset token valid for 1 hour
        const resetToken = jwt.sign(
            { id: customer.id, email: customer.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Construct the reset link (adjust URL/port as needed)
        const resetLink = `http://localhost:3000/customer/reset-password?token=${resetToken}`;

        // Set up mail options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            html: `<p>Please click <a href="${resetLink}">here</a> to reset your password. This link expires in 1 hour.</p>`
        };

        // Send the reset link email
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Reset link sent to your email.' });
    } catch (error) {
        console.error('Error sending reset link:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

// Reset Customer Password Handler
const resetPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const token = req.params.token;

        if (!token || !newPassword) {
            return res.status(400).json({ success: false, message: 'Token and new password are required.' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(400).json({ success: false, message: 'Invalid or expired token.' });
        }

        const customerId = decoded.id;
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await CustomerForgotPasswordModel.updateCustomerPassword(customerId, hashedPassword);

        return res.json({ success: true, message: 'Password reset successful.' });
    } catch (error) {
        console.error('Error in reset-password route:', error);
        return res.status(500).json({ success: false, message: 'Server error.' });
    }
};

module.exports = {
    forgotPassword,
    resetPassword
};
