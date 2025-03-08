const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// Route to fetch messages (optionally filtered by worker_id) with worker details from worker_register
router.get('/getMessages', async (req, res) => {
    try {
        const { worker_id } = req.query;
        let query = `
            SELECT wm.*, wr.firstName, wr.lastName 
            FROM worker_messages wm 
            JOIN worker_register wr ON wm.worker_id = wr.id
        `;
        const params = [];
        if (worker_id) {
            query += ' WHERE wm.worker_id = ?';
            params.push(worker_id);
        }
        const [messages] = await db.promise().execute(query, params);
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
        // Verify that the worker exists in the worker_register table
        const [workers] = await db.promise().execute(
            'SELECT id FROM worker_register WHERE id = ?',
            [worker_id]
        );
        if (workers.length === 0) {
            return res.status(404).json({ message: 'Worker not found.' });
        }
        // Insert the new message.
        const query = 'INSERT INTO worker_messages (worker_id, message) VALUES (?, ?)';
        await db.promise().execute(query, [worker_id, message]);
        res.status(201).json({ message: 'Message sent successfully.' });
    } catch (error) {
        console.error('Database insert error:', error);
        res.status(500).json({ message: 'Failed to send message', error: error.message });
    }
});

module.exports = router;