const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err);
        return;
    }
    console.log('✅ Connected to the MySQL database.');
});

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