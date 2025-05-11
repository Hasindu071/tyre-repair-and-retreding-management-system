const CustomerProfileModel = require('../models/customerProfileModel');

// Get customer profile by ID
const getCustomerProfile = async (req, res) => {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }

    try {
        const [profile] = await CustomerProfileModel.getCustomerProfileById(userId);
        if (profile.length > 0) {
            res.status(200).json(profile[0]);
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).json({ message: 'Failed to retrieve profile details' });
    }
};

// Update customer profile
const updateCustomerProfile = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, nic, phone1, phone2, houseName, city, state } = req.body;

    if (!firstName || !email || !nic || !phone1 || !houseName || !city || !state) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const [result] = await CustomerProfileModel.updateCustomerProfile(id, {
            firstName,
            lastName,
            email,
            nic,
            phone1,
            phone2,
            houseName,
            city,
            state
        });

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Customer updated successfully.' });
        } else {
            res.status(404).json({ message: 'Customer not found.' });
        }
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ message: 'Failed to update customer profile.', error: error.message });
    }
};

// Delete customer profile
const deleteCustomerProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await CustomerProfileModel.deleteCustomerProfile(id);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Customer deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Customer not found.' });
        }
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ message: 'Failed to delete customer.', error: error.message });
    }
};

//get all customer profiles
const getAllCustomerProfiles = async (req, res) => {
    try {
        const [profiles] = await CustomerProfileModel.getAllCustomerProfiles();
        if (profiles.length > 0) {
            res.status(200).json(profiles);
        } else {
            res.status(404).json({ message: 'No profiles found' });
        }
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).json({ message: 'Failed to retrieve profiles' });
    }
};

module.exports = {
    getCustomerProfile,
    updateCustomerProfile,
    deleteCustomerProfile,
    getAllCustomerProfiles
};
