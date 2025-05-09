const db = require('../config/db');

const insertNotice = async (notice) => {
    const query = 'INSERT INTO notices (notice) VALUES (?)';
    const [result] = await db.promise().execute(query, [notice]);
    return result;
};

const getAllNotices = async () => {
    const query = 'SELECT * FROM notices';
    const [rows] = await db.promise().execute(query);
    return rows;
};

const deleteNoticeById = async (id) => {
    const query = 'DELETE FROM notices WHERE id = ?';
    const [result] = await db.promise().execute(query, [id]);
    return result;
};

module.exports = {
    insertNotice,
    getAllNotices,
    deleteNoticeById
};
