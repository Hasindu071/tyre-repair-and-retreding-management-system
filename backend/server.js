require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Import routes
const registerRoute = require('./routes/OwnerRegister');

// Use routes
app.use('/OwnerRegister', registerRoute);

app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});0