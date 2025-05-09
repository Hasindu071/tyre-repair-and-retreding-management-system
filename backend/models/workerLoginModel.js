const db = require('../config/db');

const findWorkerByEmail = (email, callback) => {
    const query = 'SELECT * FROM worker_register WHERE email = ?';
    db.query(query, [email], callback);
};

module.exports = { findWorkerByEmail };
