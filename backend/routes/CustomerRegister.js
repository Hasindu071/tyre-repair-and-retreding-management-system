const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const router = express.Router();
const db = require('../config/db');

// Register route
// ✅ Add Customer Registration Route
router.post('/', async (req, res) => {
    const { firstName, lastName, nic, phone1, phone2, houseName, city, state, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `INSERT INTO customer_register 
            (firstName, lastName, nic, phone1, phone2, houseName, city, state, email, password) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(query, [firstName, lastName, nic, phone1, phone2, houseName, city, state, email, hashedPassword], (err, results) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ success: false, message: 'Server error.' });
            }
            res.status(201).json({ success: true, message: 'Customer registered successfully.' });
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;