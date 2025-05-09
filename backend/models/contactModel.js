const db = require('../config/db');

// Insert a contact form submission into the database
const submitContactForm = (name, email, subject, message) => {
    const query = 'INSERT INTO contact_form (name, email, subject, message) VALUES (?, ?, ?, ?)';
    return db.promise().execute(query, [name, email, subject, message]);
};

// Get all contact form submissions (notifications)
const getContactFormSubmissions = () => {
    const query = `
        SELECT id AS id, name AS name, email AS email, subject AS subject, message AS message, 
               created_at AS created_at, readStatus AS readStatus 
        FROM contact_form;
    `;
    return db.promise().execute(query);
};

// Mark a notification as read
const markAsRead = (notificationId) => {
    const query = 'UPDATE contact_form SET readStatus = 1 WHERE id = ?';
    return db.promise().execute(query, [notificationId]);
};

// Delete a notification
const deleteNotification = (notificationId) => {
    const query = 'DELETE FROM contact_form WHERE id = ?';
    return db.promise().execute(query, [notificationId]);
};

module.exports = {
    submitContactForm,
    getContactFormSubmissions,
    markAsRead,
    deleteNotification
};
