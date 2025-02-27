const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// Route to fetch all messages
router.get('/getMessages', async (req, res) => {
    try {
        const query = 'SELECT * FROM worker_messages';
        const [messages] = await db.promise().execute(query);
        res.status(200).json(messages);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).json({ message: 'Failed to retrieve messages' });
    }
});

// Route to save a new message
router.post('/sendMessage', async (req, res) => {
    const { worker_id, message } = req.body;

    if (!worker_id || !message) {
        return res.status(400).json({ message: 'Worker ID and message are required.' });
    }

    try {
        const query = 'INSERT INTO worker_messages (worker_id, message) VALUES (?, ?)';
        await db.promise().execute(query, [worker_id, message]);
        res.status(201).json({ message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Database insert error:', error);
        res.status(500).json({ message: 'Failed to send message' });
    }
});

module.exports = router;