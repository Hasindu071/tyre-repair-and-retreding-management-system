/*
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const db = require('../config/db');

// Configure Nodemailer transporter (example uses Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,    // your email address
        pass: process.env.EMAIL_PASS     // your email password or app password
    }
});

// POST route to handle forgot password requests
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required.' });
        }

        // Query to check if the owner exists using the promise API
        const query = 'SELECT * FROM owner_register WHERE email = ?';
        const [results] = await db.promise().query(query, [email]);

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'No account found with that email.' });
        }

        const owner = results[0];

        // Generate a reset token valid for 1 hour
        const resetToken = jwt.sign(
            { id: owner.id, email: owner.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Construct the password reset link (adjust the URL as needed)
        const resetLink = `http://localhost:3000/owner/reset-password?token=${resetToken}`;

        // Mail options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset Request',
            html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>`
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Reset link sent to your email.' });
    } catch (error) {
        console.error("Error sending reset link:", error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;
*/
// Compare this snippet from frontend/src/pages/OwnerResetPassword.js: