const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the db connection

// Contact form submission route
router.post('/submit', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const query = 'INSERT INTO contact_form (name, email, subject, message) VALUES (?, ?, ?, ?)';
        const [results] = await db.promise().execute(query, [name, email, subject, message]);

        console.log('Form submitted successfully:', results);
        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// Route to fetch all notifications
router.get("/getContact", async (req, res) => {
    try {
        const query = `
            SELECT id AS id,name AS name, email AS email, subject AS subject, message AS message, created_at AS created_at, readStatus AS readStatus
            FROM contact_form;
        `;

        const [notifications] = await db.promise().execute(query);
        res.status(200).json(notifications);
    } catch (error) {
        console.error("Database fetch error:", error);
        res.status(500).json({ message: "Failed to retrieve notifications" });
    }
});

// PUT endpoint to mark a notification as read
router.put('/markAsRead/:id', async (req, res) => {
    const notificationId = req.params.id;
    try {
      const query = "UPDATE contact_form SET readStatus = 1 WHERE id = ?";
      await db.promise().query(query, [notificationId]);
      res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to update notification" });
    }
  });
  
  // DELETE endpoint to delete a notification
  router.delete('/deleteNotification/:id', async (req, res) => {
    const notificationId = req.params.id;
    try {
      const query = "DELETE FROM contact_form WHERE id = ?";
      await db.promise().query(query, [notificationId]);
      res.status(200).json({ message: "Notification deleted" });
    } catch (error) {
      console.error("Error deleting notification:", error);
      res.status(500).json({ message: "Failed to delete notification" });
    }
  });

module.exports = router;