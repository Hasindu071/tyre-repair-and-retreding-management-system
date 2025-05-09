const NoticeModel = require('../models/noticesModel');

const addNotice = async (req, res) => {
    const { notice } = req.body;
    try {
        await NoticeModel.insertNotice(notice);
        res.status(201).json({ message: 'Notice added' });
    } catch (err) {
        console.error('Error inserting notice:', err);
        res.status(500).json({ message: 'Error inserting notice' });
    }
};

const getNotices = async (req, res) => {
    try {
        const notices = await NoticeModel.getAllNotices();
        res.status(200).json(notices);
    } catch (err) {
        console.error('Error fetching notices:', err);
        res.status(500).json({ message: 'Error fetching notices' });
    }
};

const deleteNotice = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await NoticeModel.deleteNoticeById(id);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Notice deleted successfully' });
        } else {
            res.status(404).json({ message: 'Notice not found' });
        }
    } catch (error) {
        console.error('Error deleting notice:', error);
        res.status(500).json({ message: 'Failed to delete notice' });
    }
};

module.exports = {
    addNotice,
    getNotices,
    deleteNotice
};
