const express = require('express');
const router = express.Router();
const {
    addNotice,
    getNotices,
    deleteNotice
} = require('../controllers/noticesController');

router.post('/', addNotice);
router.get('/', getNotices);
router.delete('/:id', deleteNotice);

module.exports = router;
