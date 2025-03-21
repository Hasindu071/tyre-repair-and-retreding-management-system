const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const db = require('../config/db');
require('dotenv').config();

// Configure Nodemailer transporter (using Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,    // e.g., "ryaktyres@gmail.com"
        pass: process.env.EMAIL_PASS     // e.g., your Gmail app password
    }
});

// Worker Forgot Password Route
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required.' });
        }
        
        // Search for the worker by email
        const query = 'SELECT * FROM worker_register WHERE email = ?';
        const [results] = await db.promise().query(query, [email]);
        
        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'No worker found with that email.' });
        }
        
        const worker = results[0];
        
        // Generate a reset token valid for 1 hour
        const resetToken = jwt.sign(
            { id: worker.id, email: worker.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        // Construct the reset link (adjust URL/port as needed)
        const resetLink = `http://localhost:3000/worker/reset-password?token=${resetToken}`;
        
        // Set up mail options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Worker Password Reset Request',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link expires in 1 hour.</p>`
        };
        
        // Send the email with the reset link
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Reset link sent to your email.' });
    } catch (error) {
        console.error("Error sending reset link:", error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;