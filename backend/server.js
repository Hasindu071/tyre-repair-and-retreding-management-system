require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Import routes
const Owner_registerRoute = require('./routes/OwnerRegister');
const customer_registerRoute = require('./routes/CustomerRegister');
const Worker_registerRoute = require('./routes/WorkerRegister');

// Use routes
app.use('/OwnerRegister', Owner_registerRoute);
app.use('/CustomerRegister', customer_registerRoute);
app.use('/WorkerRegister', Worker_registerRoute);

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});0