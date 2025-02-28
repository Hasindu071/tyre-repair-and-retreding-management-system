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

module.exports = router;