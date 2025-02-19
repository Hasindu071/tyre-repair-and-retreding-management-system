require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const db = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));



// Import routes
const ownerRegisterRoute = require('./routes/OwnerRegister');
const customerRegisterRoute = require('./routes/CustomerRegister');
const workerRegisterRoute = require('./routes/WorkerRegister');
const ownerLoginRoute = require('./routes/OwnerLogin');
const workerLoginRoute = require('./routes/WorkerLogin');
const customerLoginRoute = require('./routes/CustomerLogin');
const contactRoute = require('./routes/contact');
const retreadingRoute = require('./routes/Retreading');
const tyreRepairRoute = require('./routes/Repairing');

// Use routes
app.use('/OwnerRegister', ownerRegisterRoute);
app.use('/CustomerRegister', customerRegisterRoute);
app.use('/WorkerRegister', workerRegisterRoute);
app.use('/Owner', ownerLoginRoute);
app.use('/Worker', workerLoginRoute);
app.use('/Customer', customerLoginRoute);
app.use('/contact', contactRoute);
app.use('/Retreading', retreadingRoute);
app.use('/Repairing', tyreRepairRoute);



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