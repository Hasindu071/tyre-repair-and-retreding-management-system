const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Check if NIC exists in the database
const checkNICExists = (nic) => {
    return db.promise().query('SELECT * FROM customer_register WHERE nic = ?', [nic]);
};

// Check if email exists in the database
const checkEmailExists = (email) => {
    return db.promise().query('SELECT * FROM customer_register WHERE email = ?', [email]);
};

// Register a new customer in the database
const registerCustomer = (customerData) => {
    const { firstName, lastName, nic, phone1, phone2, houseName, city, state, email, hashedPassword } = customerData;
    console .log(customerData);
    const query = `INSERT INTO customer_register 
        (firstName, lastName, nic, phone1, phone2, houseName, city, state, email, password) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;



    return db.promise().query(query, [
        firstName, lastName, nic, phone1, phone2,
        houseName, city, state, email, hashedPassword
    ]);
};

// Hash password before storing
const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
};

module.exports = {
    checkNICExists,
    checkEmailExists,
    registerCustomer,
    hashPassword
};
