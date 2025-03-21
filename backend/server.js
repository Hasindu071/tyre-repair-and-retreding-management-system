require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const db = require('./config/db');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files from the assets directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

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
const ProductsRoute = require('./routes/products');
const paymentsRoute = require('./routes/payments');
const servicesRoute = require('./routes/services');
const ordersRoute = require('./routes/orders');
const customerProfileRoute = require('./routes/CustomerProfile');
const noticesRouter = require('./routes/notices');
const workerProfileRouter = require('./routes/workerProfile');
const suppliesRouter = require('./routes/Supplies');
const OurProductOwner = require('./routes/our_products');
const patternsRoute = require('./routes/updatingpattern');
const attendanceMarkRoute = require('./routes/attendanceMark');
const ownerForgotPasswordRouter = require('./routes/OwnerForgotPassword');

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
app.use('/OurProductOwner', OurProductOwner);
app.use('/patterns', patternsRoute);
app.use('/attendance', attendanceMarkRoute);
app.use('/ownerForgotPassword', ownerForgotPasswordRouter);


// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
