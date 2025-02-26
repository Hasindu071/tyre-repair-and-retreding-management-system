const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

router.post('/login', (req, res) => {
    console.log("Incoming login request:", req.body);  // 🟢 Debugging log

    const { email, password } = req.body;

    if (!email || !password) {
        console.log("❌ Missing email or password!");  // 🟠 Debugging log
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const query = 'SELECT * FROM worker_register WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error("❌ Database error:", err);
            return res.status(500).json({ success: false, message: 'Server error.' });
        }

        if (results.length === 0) {
            console.log("❌ No user found for email:", email);  // 🔴 Debugging log
            return res.status(400).json({ success: false, message: 'Invalid credentials.' });
        }

        const worker = results[0];
        console.log("✅ Worker found:", worker);  // 🟢 Debugging log

        const isMatch = await bcrypt.compare(password, worker.password);
        console.log("✅ Password match:", isMatch);  // 🟢 Debugging log

        if (!isMatch) {
            console.log("❌ Password incorrect for:", email);
            return res.status(400).json({ success: false, message: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            { workerId: worker.id, email: worker.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.json({ success: true, message: 'Login successful.', token });
    });
});


module.exports = router;