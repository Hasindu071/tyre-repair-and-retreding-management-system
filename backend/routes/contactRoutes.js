const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactController');

// POST: Submit contact form
router.post('/submit', ContactController.submitForm);

// GET: Get all contact form submissions (notifications)
router.get('/getContact', ContactController.getAllContactForms);

// PUT: Mark a notification as read
router.put('/markAsRead/:id', ContactController.markAsRead);

// DELETE: Delete a notification
router.delete('/deleteNotification/:id', ContactController.deleteNotification);

module.exports = router;
