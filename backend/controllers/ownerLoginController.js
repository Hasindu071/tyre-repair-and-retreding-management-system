const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const OwnerLogin = require('../models/ownerLoginModel');

const loginOwner = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    OwnerLogin.findOwnerByEmail(email, async (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Server error.' });
        }

        if (results.length === 0) {
            return res.status(400).json({ success: false, message: 'Invalid credentials.' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({
            success: true,
            message: 'Login successful.',
            token,
            owner: {
                id: user.id,
                name: `${user.firstName} ${user.lastName}`
            }
        });
    });
};

module.exports = { loginOwner };
