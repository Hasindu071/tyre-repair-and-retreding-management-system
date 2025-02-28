const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// Route to fetch profile details
router.get('/getProfile/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const query = 'SELECT firstName, lastName, email, nic, phone1, phone2, houseName, city, state FROM customer_register WHERE id = ?';
        const [profile] = await db.promise().execute(query, [userId]);
        if (profile.length > 0) {
            res.status(200).json(profile[0]);
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).json({ message: 'Failed to retrieve profile details' });
    }
});

module.exports = router;