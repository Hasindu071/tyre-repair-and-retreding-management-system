// workerRegisterController.js
const bcrypt = require('bcryptjs');
const Worker = require('./workerRegisterModel');

exports.registerWorker = async (req, res) => {
  const { firstName, lastName, email, title, phone1, phone2, nic, address1, address2, password } = req.body;
  const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

  if (!email || !password || !profilePicture) {
    return res.status(400).json({ success: false, message: "Email, password, and profile picture are required." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = [firstName, lastName, email, title, phone1, phone2, nic, address1, address2, hashedPassword, profilePicture];

    Worker.createWorker(data, (err, results) => {
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
};

exports.getAllWorkers = (req, res) => {
  Worker.getAllWorkers((err, results) => {
    if (err) {
      console.error("Error fetching workers:", err);
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
    res.status(200).json(results);
  });
};

exports.updateWorkerStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  Worker.updateStatusById(id, status, (err, results) => {
    if (err) {
      console.error("Error updating worker status:", err);
      return res.status(500).json({ success: false, message: 'Server error.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Worker not found.' });
    }
    res.status(200).json({ success: true, message: 'Worker status updated successfully.' });
  });
};

exports.getApprovedWorkers = async (req, res) => {
  try {
    const [rows] = await Worker.getApprovedWorkers();
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching approved workers:", error);
    res.status(500).json({ message: "Server error fetching approved workers" });
  }
};
