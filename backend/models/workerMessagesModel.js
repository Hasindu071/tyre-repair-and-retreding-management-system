const db = require('../config/db');

module.exports = {
    getMessages: async (worker_id) => {
        let query = `
            SELECT wm.*, wr.firstName, wr.lastName, wr.email
            FROM worker_messages wm 
            JOIN worker_register wr ON wm.worker_id = wr.id
        `;
        const params = [];
        if (worker_id) {
            query += ' WHERE wm.worker_id = ?';
            params.push(worker_id);
        }
        const [messages] = await db.promise().execute(query, params);
        return messages;
    },

    workerExists: async (worker_id) => {
        const [workers] = await db.promise().execute(
            'SELECT id FROM worker_register WHERE id = ?',
            [worker_id]
        );
        return workers.length > 0;
    },

    sendMessage: async (worker_id, message) => {
        const query = 'INSERT INTO worker_messages (worker_id, message) VALUES (?, ?)';
        await db.promise().execute(query, [worker_id, message]);
    },

    markAsRead: async (id) => {
        const [result] = await db.promise().execute(
            'UPDATE worker_messages SET is_read = 1 WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    },

    deleteMessage: async (id) => {
        const [result] = await db.promise().execute(
            'DELETE FROM worker_messages WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    }
};
