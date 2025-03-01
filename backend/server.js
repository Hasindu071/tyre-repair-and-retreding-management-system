require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
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
const retreadingRoute = require('./routes/retreading');
const tyreRepairRoute = require('./routes/repairing');
const showCustomerRoute = require('./routes/showCustomer');
const customerPaymentRoute = require('./routes/CustomerPayment');
const workerMessagesRoute = require('./routes/workerMessages');
const wokerProfileRoute = require('./routes/workerProfile');
const ProductsRoute = require('./routes/Products');
const paymentsRoute = require('./routes/payments');
const servicesRoute = require('./routes/services');
const ordersRoute = require('./routes/orders');
const customerProfileRoute = require('./routes/CustomerProfile');
const noticesRouter = require('./routes/notices');
const workerProfileRouter = require('./routes/workerProfile');
const suppliesRouter = require('./routes/Supplies');

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
app.use('/', showCustomerRoute);
app.use('/CustomerPayment', customerPaymentRoute);
app.use('/WorkerMessages', workerMessagesRoute);
app.use('/WorkerProfile', wokerProfileRoute);
app.use('/Products', ProductsRoute);
app.use('/Payments', paymentsRoute);
app.use('/Services', servicesRoute);
app.use('/Orders', ordersRoute);
app.use('/CustomerProfile', customerProfileRoute);
app.use('/notices', noticesRouter);
app.use('/workerProfile', workerProfileRouter);
app.use('/supplies', suppliesRouter);

// ✅ Add Customer Registration Route
app.post('/registerCustomer', async (req, res) => {
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

// ✅ Add Worker Registration Route
app.post('/registerWorker', async (req, res) => {
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

// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
