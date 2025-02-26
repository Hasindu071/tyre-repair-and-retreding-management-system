const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the db connection

// Contact form submission route
router.post('/submit', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const query = 'INSERT INTO contact_form (name, email, subject, message) VALUES (?, ?, ?, ?)';
        const [results] = await db.promise().execute(query, [name, email, subject, message]);

        console.log('Form submitted successfully:', results);
        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

module.exports = router;
