const db = require('../config/db');

const OwnerRegisterModel = {
    createOwner: (firstName, lastName, email, hashedPassword) => {
        const query = `
            INSERT INTO owner_register (firstName, lastName, email, password)
            VALUES (?, ?, ?, ?)
        `;
        return new Promise((resolve, reject) => {
            db.query(query, [firstName, lastName, email, hashedPassword], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
};

module.exports = OwnerRegisterModel;
