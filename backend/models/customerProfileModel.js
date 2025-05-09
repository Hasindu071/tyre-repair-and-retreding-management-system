const db = require('../config/db');

// Find customer profile by ID
const getCustomerProfileById = (id) => {
    const query = 'SELECT firstName, lastName, email, nic, phone1, phone2, houseName, city, state FROM customer_register WHERE id = ?';
    return db.promise().query(query, [id]);
};

// Update customer profile
const updateCustomerProfile = (id, profileData) => {
    const { firstName, lastName, email, nic, phone1, phone2, houseName, city, state } = profileData;
    const query = `
        UPDATE customer_register 
        SET firstName = ?, lastName = ?, email = ?, nic = ?, phone1 = ?, phone2 = ?, houseName = ?, city = ?, state = ? 
        WHERE id = ?
    `;
    return db.promise().query(query, [
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
};

// Delete customer profile
const deleteCustomerProfile = (id) => {
    const query = "DELETE FROM customer_register WHERE id = ?";
    return db.promise().query(query, [id]);
};

module.exports = {
    getCustomerProfileById,
    updateCustomerProfile,
    deleteCustomerProfile
};
