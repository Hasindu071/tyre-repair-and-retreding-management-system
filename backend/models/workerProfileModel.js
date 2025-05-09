const db = require('../config/db');

const getWorkerById = async (id) => {
    const query = "SELECT * FROM worker_register WHERE id = ?";
    const [rows] = await db.promise().execute(query, [id]);
    return rows;
};

module.exports = { getWorkerById };
