const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

router.get('/getProfile/:id', async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }
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

// PUT /customers/:id – Update customer profile
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    // Use field names that match your database columns
    const {
        firstName,
        lastName,
        email,
        nic,
        phone1,
        phone2,
        houseName,
        city,
        state
    } = req.body;

    // Basic validation (adjust as needed)
    if (
        !firstName ||
        !email ||
        !nic ||
        !phone1 ||
        !houseName ||
        !city ||
        !state
    ) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        // Update query matching your column names
        const query = `
            UPDATE customer_register 
            SET firstName = ?, lastName = ?, email = ?, nic = ?, phone1 = ?, phone2 = ?, houseName = ?, city = ?, state = ? 
            WHERE id = ?
        `;
        const [result] = await db.promise().execute(query, [
            firstName,
            lastName,
            email,
            nic,
            phone1,
            phone2,
            houseName,
            city,
            state,
            id
        ]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Customer updated successfully.' });
        } else {
            res.status(404).json({ message: 'Customer not found.' });
        }
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ message: 'Failed to update customer profile.', error: error.message });
    }
});

// DELETE endpoint to delete a customer by id
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const query = "DELETE FROM customer_register WHERE id = ?";
        const [result] = await db.promise().execute(query, [id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Customer deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Customer not found.' });
        }
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ message: 'Failed to delete customer.', error: error.message });
    }
});

module.exports = router;