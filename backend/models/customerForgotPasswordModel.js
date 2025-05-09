const db = require('../config/db');

// Find customer by email
const findCustomerByEmail = (email) => {
    const query = 'SELECT * FROM customer_register WHERE email = ?';
    return db.promise().query(query, [email]);
};

// Update customer password
const updateCustomerPassword = (id, hashedPassword) => {
    const query = 'UPDATE customer_register SET password = ? WHERE id = ?';
    return db.promise().query(query, [hashedPassword, id]);
};

module.exports = {
    findCustomerByEmail,
    updateCustomerPassword
};
