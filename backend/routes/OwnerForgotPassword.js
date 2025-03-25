const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const db = require('../config/db');
require('dotenv').config();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,    // your email address, e.g.: "ryaktyres@gmail.com"
    pass: process.env.EMAIL_PASS     // your Gmail app password
  }
});

// POST /forgot-password
router.post('/forgot-password', async (req, res) => {
  try {
      const { email } = req.body;
      if (!email) {
          return res.status(400).json({ success: false, message: 'Email is required.' });
      }
      
      // Look up the owner by email
      const query = 'SELECT * FROM owner_register WHERE email = ?';
      const [results] = await db.promise().query(query, [email]);
      console.log(results);
      
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
      
      // Construct the reset link (adjust URL/port as needed)
      const resetLink = `http://localhost:3000/owner/reset-password?token=${resetToken}`;
      
      // Set up mail options
      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Password Reset Request',
          html: `<p>Please click <a href="${resetLink}">here</a> to reset your password. This link expires in 1 hour.</p>`
      };
      
      // Send the reset link email
      await transporter.sendMail(mailOptions);
      console.log(`Reset link sent to ${email}.`);
      return res.json({ success: true, message: 'Reset link sent to your email.' });
  } catch (error) {
      console.error("Error in forgot-password route:", error);
      return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;