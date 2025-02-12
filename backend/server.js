require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000; 

// Middleware
app.use(express.json()); // Replaces body-parser
app.use(cors({ origin: 'http://localhost:3000' }));

// Import routes
const ownerRegisterRoute = require('./routes/OwnerRegister');

// Use routes
app.use('/OwnerRegister', ownerRegisterRoute);

// Start server
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
