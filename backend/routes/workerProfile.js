const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// Route to fetch worker details
router.get('/getWorker/:id', async (req, res) => {
    const workerId = req.params.id;
    try {
        const query = 'SELECT * FROM workers WHERE id = ?';
        const [worker] = await db.promise().execute(query, [workerId]);
        if (worker.length > 0) {
            res.status(200).json(worker[0]);
        } else {
            res.status(404).json({ message: 'Worker not found' });
        }
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).json({ message: 'Failed to retrieve worker details' });
    }
});

module.exports = router;