require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); 
app.use(cors({ origin: 'http://localhost:3000' }));

// Import routes
const ownerRegisterRoute = require('./routes/OwnerRegister');
const customerRegisterRoute = require('./routes/CustomerRegister');

// Use routes
app.use('/OwnerRegister', ownerRegisterRoute);
app.use('/CustomerRegister', customerRegisterRoute);

// ✅ Add Customer Registration Route
app.post('/registerCustomer', (req, res) => {
    console.log('Received customer data:', req.body);
    
    // Simulate saving to database (Replace with actual DB logic)
    res.json({ message: 'Customer registered successfully', data: req.body });
});

// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
