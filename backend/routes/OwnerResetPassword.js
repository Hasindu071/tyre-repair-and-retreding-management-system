const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Changed from 'bcrypt' to 'bcryptjs'
const db = require('../config/db');
require('dotenv').config();

router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ success: false, message: 'Token and new password are required.' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Invalid or expired token.' });
    }

    const ownerId = decoded.id;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updateQuery = 'UPDATE owner_register SET password = ? WHERE id = ?';
    await db.promise().query(updateQuery, [hashedPassword, ownerId]);

    return res.json({ success: true, message: 'Password reset successful.' });
  } catch (error) {
    console.error("Error in reset-password route:", error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;