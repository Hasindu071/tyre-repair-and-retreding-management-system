const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CustomerModel = require('../models/customerLoginModel');

const loginCustomer = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    CustomerModel.findCustomerByEmail(email, async (err, results) => {
        if (err) {
            console.error('Error fetching customer:', err);
            return res.status(500).json({ message: 'Server error.' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.json({ 
            success: true,
            token,
            customer: {
                id: user.id,
                email: user.email,
                userName: `${user.firstName} ${user.lastName}`
            }
        });
    });
};

module.exports = { loginCustomer };
