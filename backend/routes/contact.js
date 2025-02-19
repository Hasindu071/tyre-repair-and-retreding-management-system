const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the db connection

// Contact form submission route
router.post('/submit', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const query = 'INSERT INTO contact_form (name, email, subject, message) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, subject, message], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Server error.' });
        }
        res.status(200).json({ message: 'Form submitted successfully!' });
    });
});

module.exports = router;