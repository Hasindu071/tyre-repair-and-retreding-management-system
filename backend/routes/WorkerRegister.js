const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcryptjs'); // Import bcrypt
const db = require('../config/db');

// ✅ Add Worker Registration Route
router.post('/', async (req, res) => {
    const { firstName, lastName, email, title, phone1, phone2, nic, address1, address2, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `INSERT INTO worker_register 
            (firstName, lastName, email, title, phone1, phone2, nic, address1, address2, password) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(query, [firstName, lastName, email, title, phone1, phone2, nic, address1, address2, hashedPassword], (err, results) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ success: false, message: 'Server error.' });
            }
            res.status(201).json({ success: true, message: 'Worker registered successfully.' });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;