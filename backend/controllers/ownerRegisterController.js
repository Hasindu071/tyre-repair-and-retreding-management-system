const bcrypt = require('bcryptjs');
const OwnerRegisterModel = require('../models/ownerRegisterModel');

const OwnerRegisterController = {
    register: async (req, res) => {
        const { firstName, lastName, email, password, Confirm_Password } = req.body;

        // Validate fields
        if (!firstName || !lastName || !email || !password || !Confirm_Password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        if (password !== Confirm_Password) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await OwnerRegisterModel.createOwner(firstName, lastName, email, hashedPassword);
            res.status(201).json({ message: 'Owner registered successfully.', ownerId: result.insertId });
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'An account with this email already exists.' });
            }
            console.error('Registration error:', err);
            res.status(500).json({ message: 'Server error. Please try again later.' });
        }
    }
};

module.exports = OwnerRegisterController;
