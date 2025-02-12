const express = require('express');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const router = express.Router();

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

// Register route
router.post('/', async (req, res) => {
    const { firstName, lastName, email, password, Confirm_Password} = req.body;

    if (!firstName || !lastName || !email || !password || !Confirm_Password ) {
        return res.status(400).send('All fields are required.');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO owner_register (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
        db.query(query, [firstName, lastName, email, hashedPassword], (err, results) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).send('Server error.');
            }
            res.status(201).send('User registered successfully.');
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).send('Server error.');
    }
});

module.exports = router;