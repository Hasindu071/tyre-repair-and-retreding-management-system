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
app.use("/attendanceMark", require("./routes/attendanceMarkRoutes"));

// Serve static files from the assets directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Import routes
const ownerRegisterRoute = require('./routes/ownerRegisterRoutes');
const customerRegisterRoute = require('./routes/customerRegisterRoutes');
const workerRegisterRoute = require('./routes/workerRegisterRoutes');
const ownerLoginRoute = require('./routes/ownerLoginRoutes');
const workerLoginRoute = require('./routes/workerLoginRoutes');
const customerLoginRoute = require('./routes/customerLoginRoutes');
const contactRoute = require('./routes/contactRoutes');
const retreadingRoute = require('./routes/retreadingRoutes');
const tyreRepairRoute = require('./routes/repairing');
const showCustomerRoute = require('./routes/showCustomerRoutes');
const customerPaymentRoute = require('./routes/customerPaymentRoutes');
const workerMessagesRoute = require('./routes/workerMessagesRoutes');
const wokerProfileRoute = require('./routes/workerProfileRoutes');
const ProductsRoute = require('./routes/products');
const paymentsRoute = require('./routes/paymentsRoutes');
const servicesRoute = require('./routes/servicesRoutes');
const ordersRoute = require('./routes/orders');
const customerProfileRoute = require('./routes/customerProfileRoutes');
const noticesRouter = require('./routes/noticesRoutes');
const workerProfileRouter = require('./routes/workerProfileRoutes');
const suppliesRouter = require('./routes/Supplies');
const OurProductOwner = require('./routes/ourProductsRoutes');
const patternsRoute = require('./routes/patternRoutes');
const attendanceMarkRoute = require('./routes/attendanceMarkRoutes');
const ReportRoute = require('./routes/reports');
const ownerForgotPasswordRouter = require('./routes/OwnerForgotPassword');
const workerForgotPasswordRouter = require('./routes/workerForgotPasswordRoutes');
const CustomerForgotPassword = require('./routes/customerForgotPasswordRoutes');
const ownerResetPasswordRouter = require('./routes/OwnerResetPassword');

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
app.use('/workerForgotPassword', workerForgotPasswordRouter);
app.use('/CustomerForgotPassword', CustomerForgotPassword);
app.use('/owner', ownerResetPasswordRouter);
app.use('/reports', ReportRoute);





// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
