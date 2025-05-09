const db = require('../config/db');

const findCustomerByEmail = (email, callback) => {
    const query = 'SELECT * FROM customer_register WHERE email = ?';
    db.query(query, [email], callback);
};

module.exports = { findCustomerByEmail };
