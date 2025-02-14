require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

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

// Import routes
const ownerRegisterRoute = require('./routes/OwnerRegister');
const customerRegisterRoute = require('./routes/CustomerRegister');
const workerRegisterRoute = require('./routes/WorkerRegister');
const ownerLoginRoute = require('./routes/OwnerLogin');

// Use routes
app.use('/OwnerRegister', ownerRegisterRoute);
app.use('/CustomerRegister', customerRegisterRoute);
app.use('/WorkerRegister', workerRegisterRoute);
app.use('/OwnerLogin', ownerLoginRoute);

// ✅ Add Customer Registration Route
app.post('/registerCustomer', (req, res) => {
    const { firstName, lastName, nic, phone1, phone2, houseName, city, state, email, password } = req.body;

    const query = 'INSERT INTO customer_register (firstName, lastName, nic, phone1, phone2, houseName, city, state, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [firstName, lastName, nic, phone1, phone2, houseName, city, state, email, password], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Server error.');
        }
        res.status(201).send('Customer registered successfully.');
    });
});

// ✅ Add Worker Registration Route
app.post('/registerWorker', (req, res) => {
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

// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});