const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const router = express.Router();
const db = require('../config/db');

// Register route
router.post('/', async (req, res) => {
    const { firstName, lastName, email, password, Confirm_Password, phone1, phone2, address } = req.body;

    if (!firstName || !lastName || !email || !password || !Confirm_Password) {
        return res.status(400).send('All fields are required.');
    }

    if (password !== Confirm_Password) {
        return res.status(400).send('Passwords do not match.');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO customer_register (firstName, lastName, email, password, phone1, phone2, address) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [firstName, lastName, email, hashedPassword, phone1, phone2, address], (err, results) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).send('Server error.');
            }
            res.status(201).send('Customer registered successfully.');
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).send('Server error.');
    }
});

module.exports = router;