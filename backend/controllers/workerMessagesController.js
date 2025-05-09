const model = require('../model/workerMessagesModel');

module.exports = {
    getMessages: async (req, res) => {
        try {
            const messages = await model.getMessages(req.query.worker_id);
            res.status(200).json(messages);
        } catch (error) {
            console.error('Fetch error:', error);
            res.status(500).json({ message: 'Failed to retrieve messages' });
        }
    },

    sendMessage: async (req, res) => {
        const { worker_id, message } = req.body;
        if (!worker_id || !message) {
            return res.status(400).json({ message: 'Worker ID and message are required.' });
        }

        try {
            const exists = await model.workerExists(worker_id);
            if (!exists) {
                return res.status(404).json({ message: 'Worker not found.' });
            }

            await model.sendMessage(worker_id, message);
            res.status(201).json({ message: 'Message sent successfully.' });
        } catch (error) {
            console.error('Send error:', error);
            res.status(500).json({ message: 'Failed to send message', error: error.message });
        }
    },

    markAsRead: async (req, res) => {
        try {
            const updated = await model.markAsRead(req.params.id);
            if (!updated) {
                return res.status(404).json({ message: 'Message not found.' });
            }
            res.status(200).json({ message: 'Message marked as read.' });
        } catch (error) {
            console.error('Update error:', error);
            res.status(500).json({ message: 'Failed to mark message as read', error: error.message });
        }
    },

    deleteMessage: async (req, res) => {
        try {
            const deleted = await model.deleteMessage(req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: 'Message not found.' });
            }
            res.status(200).json({ message: 'Message deleted successfully.' });
        } catch (error) {
            console.error('Delete error:', error);
            res.status(500).json({ message: 'Failed to delete message', error: error.message });
        }
    }
};
