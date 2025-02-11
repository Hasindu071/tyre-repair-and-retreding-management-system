require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

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
app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, secretKey } = req.body;

    if (!firstName || !lastName || !email || !password || !secretKey) {
        return res.status(400).send('All fields are required.');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO OwnerRegister (firstName, lastName, email, password, secretKey) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [firstName, lastName, email, hashedPassword, secretKey], (err, results) => {
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

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});