// workerRegisterModel.js
const db = require('../config/db');

const WorkerRegisterModel = {
  createWorker: (data, callback) => {
    const query = `
      INSERT INTO worker_register 
      (firstName, lastName, email, title, phone1, phone2, nic, address1, address2, password, profilePicture, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
    `;
    db.query(query, data, callback);
  },

  getAllWorkers: (callback) => {
    const query = "SELECT id, title, firstName, lastName, email, nic, address1, address2, profilePicture, status FROM worker_register";
    db.query(query, callback);
  },

  updateStatusById: (id, status, callback) => {
    const query = "UPDATE worker_register SET status = ? WHERE id = ?";
    db.query(query, [status, id], callback);
  },

  getApprovedWorkers: () => {
    const query = `
      SELECT id, title, firstName, lastName, email, nic, address1, address2, profilePicture, status 
      FROM worker_register 
      WHERE status = 'Approved'
    `;
    return db.promise().query(query);
  }
};

module.exports = WorkerRegisterModel;
