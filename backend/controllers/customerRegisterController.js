const CustomerRegisterModel = require('../models/customerRegisterModel');

const registerCustomer = async (req, res) => {
    const {
        firstName, lastName, nic, phone1, phone2,
        houseName, city, state, email, password
    } = req.body;

    // If only NIC is provided (for NIC availability check), do not require email/password.
    if (!email && !password && nic) {
        try {
            const [existing] = await CustomerRegisterModel.checkNICExists(nic);
            if (existing.length > 0) {
                return res.status(200).json({ exists: true });
            } else {
                return res.status(200).json({ exists: false });
            }
        } catch (error) {
            console.error('Error checking NIC:', error);
            return res.status(500).json({ success: false, message: 'Server error.' });
        }
    }

    // For full registration, require email and password.
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    try {
        // Check if NIC already exists
        const [existingNIC] = await CustomerRegisterModel.checkNICExists(nic);
        if (existingNIC.length > 0) {
            return res.status(409).json({ success: false, message: 'NIC already exists.' });
        }

        // Check if email already exists
        const [existingEmail] = await CustomerRegisterModel.checkEmailExists(email);
        if (existingEmail.length > 0) {
            return res.status(409).json({ success: false, message: 'Email already exists.' });
        }

        // Hash the password
        const hashedPassword = await CustomerRegisterModel.hashPassword(password);

        // Register the customer
        await CustomerRegisterModel.registerCustomer({
            firstName, lastName, nic, phone1, phone2,
            houseName, city, state, email, hashedPassword
        });

        res.status(201).json({ success: true, message: 'Customer registered successfully.' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

module.exports = {
    registerCustomer
};
