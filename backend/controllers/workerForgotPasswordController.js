const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendResetEmail } = require('../utils/mailer');
require('dotenv').config();

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });

        const [results] = await db.promise().query('SELECT * FROM worker_register WHERE email = ?', [email]);
        if (results.length === 0)
            return res.status(404).json({ success: false, message: 'No worker found with that email.' });

        const worker = results[0];
        const resetToken = jwt.sign({ id: worker.id, email: worker.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const resetLink = `http://localhost:3000/worker/reset-password?token=${resetToken}`;

        await sendResetEmail(email, resetLink);
        res.json({ success: true, message: 'Reset link sent to your email.' });
    } catch (error) {
        console.error("Error sending reset link:", error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const token = req.params.token;
        if (!token || !newPassword)
            return res.status(400).json({ success: false, message: 'Token and new password are required.' });

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return res.status(400).json({ success: false, message: 'Invalid or expired token.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.promise().query('UPDATE worker_register SET password = ? WHERE id = ?', [hashedPassword, decoded.id]);
        res.json({ success: true, message: 'Password reset successful.' });
    } catch (error) {
        console.error("Error in reset-password:", error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};
