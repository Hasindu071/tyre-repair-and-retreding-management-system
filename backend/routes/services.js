const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// Route to fetch all repair services
router.get('/getRepairs', async (req, res) => {
    try {
        const [repairs] = await db.promise().execute('SELECT * FROM repairing');
        res.status(200).json(repairs);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).json({ message: 'Failed to retrieve repair services' });
    }
});

// Route to fetch all retreading services
router.get('/getRetreadings', async (req, res) => {
    try {
        const [retreadings] = await db.promise().execute('SELECT * FROM retreading');
        res.status(200).json(retreadings);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).json({ message: 'Failed to retrieve retreading services' });
    }
});

module.exports = router;