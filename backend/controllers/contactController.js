const ContactModel = require('../models/contactModel');

// Handle form submission
const submitForm = async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        await ContactModel.submitContactForm(name, email, subject, message);
        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// Get all contact form submissions (notifications)
const getAllContactForms = async (req, res) => {
    try {
        const [notifications] = await ContactModel.getContactFormSubmissions();
        res.status(200).json(notifications);
    } catch (error) {
        console.error("Database fetch error:", error);
        res.status(500).json({ message: "Failed to retrieve notifications" });
    }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
    const notificationId = req.params.id;
    try {
        await ContactModel.markAsRead(notificationId);
        res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
        console.error("Error marking notification as read:", error);
        res.status(500).json({ message: "Failed to update notification" });
    }
};

// Delete a notification
const deleteNotification = async (req, res) => {
    const notificationId = req.params.id;
    try {
        await ContactModel.deleteNotification(notificationId);
        res.status(200).json({ message: "Notification deleted" });
    } catch (error) {
        console.error("Error deleting notification:", error);
        res.status(500).json({ message: "Failed to delete notification" });
    }
};

module.exports = {
    submitForm,
    getAllContactForms,
    markAsRead,
    deleteNotification
};
