const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const db = require('../config/db');

// Worker registration route
router.post('/', (req, res) => {
    const { firstName, lastName, email, title, phone1, phone2, nic, address1, address2, password } = req.body;

    const query = 'INSERT INTO worker_register (firstName, lastName, email, title, phone1, phone2, nic, address1, address2, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [firstName, lastName, email, title, phone1, phone2, nic, address1, address2, password], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Server error.');
        }
        res.status(201).send('Worker registered successfully.');
    });
});

module.exports = router;