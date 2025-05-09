const db = require('../config/db');

const findOwnerByEmail = (email, callback) => {
    const query = 'SELECT * FROM owner_register WHERE email = ?';
    db.query(query, [email], callback);
};

module.exports = { findOwnerByEmail };
