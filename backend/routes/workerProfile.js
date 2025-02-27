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

// Route to update worker details
router.put('/updateWorker/:id', async (req, res) => {
    const workerId = req.params.id;
    const { name, email, phone, address, role, assigned_tasks, work_history } = req.body;

    try {
        const query = `
            UPDATE workers 
            SET name = ?, email = ?, phone = ?, address = ?, role = ?, assigned_tasks = ?, work_history = ?
            WHERE id = ?
        `;
        await db.promise().execute(query, [name, email, phone, address, role, assigned_tasks, work_history, workerId]);
        res.status(200).json({ message: 'Worker details updated successfully' });
    } catch (error) {
        console.error('Database update error:', error);
        res.status(500).json({ message: 'Failed to update worker details' });
    }
});

module.exports = router;