const express = require('express');
const router = express.Router();
const controller = require('../controllers/workerMessagesController');

router.get('/getMessages', controller.getMessages);
router.post('/sendMessage', controller.sendMessage);
router.put('/markAsRead/:id', controller.markAsRead);
router.delete('/deleteMessage/:id', controller.deleteMessage);

module.exports = router;
