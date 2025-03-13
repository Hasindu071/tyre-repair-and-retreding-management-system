const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

router.post('/', (req, res) => {
    const { notice } = req.body;
    const query = 'INSERT INTO notices (notice) VALUES (?)';
    db.query(query, [notice], (err, result) => {
        if (err) {
            console.error('Error inserting notice:', err);
            res.status(500).send('Error inserting notice');
            return;
        }
        res.status(201).send('Notice added');
    });
});

router.get('/', (req, res) => {
    const query = 'SELECT * FROM notices';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching notices:', err);
            res.status(500).send('Error fetching notices');
            return;
        }
        res.json(results);
    });
});

// DELETE: Delete a notice by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM notices WHERE id = ?';
    try {
        const [result] = await db.promise().execute(query, [id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Notice deleted successfully' });
        } else {
            res.status(404).json({ message: 'Notice not found' });
        }
    } catch (error) {
        console.error('Error deleting notice:', error);
        res.status(500).json({ message: 'Failed to delete notice' });
    }
});

module.exports = router;