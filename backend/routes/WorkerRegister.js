const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const db = require('../config/db');

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // e.g. 1625239070123.jpg
    }
});
const upload = multer({ storage });

// Add Worker Registration Route with Profile Picture Upload
router.post('/', upload.single('profilePicture'), async (req, res) => {
  const { firstName, lastName, email, title, phone1, phone2, nic, address1, address2, password } = req.body;
  const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

  if (!email || !password || !profilePicture) {
      return res.status(400).json({ success: false, message: "Email, password, and profile picture are required." });
  }

  try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const query = `
          INSERT INTO worker_register (firstName, lastName, email, title, phone1, phone2, nic, address1, address2, password, profilePicture, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
      `;
      db.query(query, [firstName, lastName, email, title, phone1, phone2, nic, address1, address2, hashedPassword, profilePicture], (err, results) => {
          if (err) {
              if (err.code === 'ER_DUP_ENTRY') {
                  return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
              }
              console.error('Error inserting data:', err);
              return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
          }
          res.status(201).json({ success: true, message: 'Worker registered successfully.' });
      });
  } catch (error) {
      console.error('Error hashing password:', error);
      res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

// GET route – Retrieve all registered workers (including profile picture path)
router.get('/', (req, res) => {
    const query = "SELECT id, title, firstName, lastName, email, nic, address1, address2, profilePicture, status FROM worker_register";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching workers:", err);
        return res.status(500).json({ success: false, message: 'Server error.' });
      }
      res.status(200).json(results);
    });
  });

 // Add this after your GET routes
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const query = "UPDATE worker_register SET status = ? WHERE id = ?";
    db.query(query, [status, id], (err, results) => {
      if (err) {
        console.error("Error updating worker status:", err);
        return res.status(500).json({ success: false, message: 'Server error.' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Worker not found.' });
      }
      res.status(200).json({ success: true, message: 'Worker status updated successfully.' });
    });
  });

  // Add this after your PUT route
  router.put('/update-status/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const query = "UPDATE worker_register SET status = ? WHERE id = ?";
    db.query(query, [status, id], (err, results) => {
      if (err) {
        console.error("Error updating worker status:", err);
        return res.status(500).json({ success: false, message: 'Server error.' });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Worker not found.' });
      }
      res.status(200).json({ success: true, message: 'Worker status updated successfully.' });
    });
  });

module.exports = router;