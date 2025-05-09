// model/retreadingModel.js
const db = require('../config/db');

const RetreadingModel = {
  createRetreading: (data, callback) => {
    const query = `
      INSERT INTO services 
      (service_id, tireBrand, internalStructure, receiveDate, notes, needDeliveryService, status, customer_ID, total_amount)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, data, callback);
  },

  insertRetreadingData: (serviceId, retreadingData, callback) => {
    const query = `
      INSERT INTO retreading 
      (id, sizeCode, wheelDiameter, tireWidth, tirePattern, insidePhoto, outsidePhoto)
      VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [serviceId, ...retreadingData], callback);
  },

  getRetreadingById: (id, callback) => {
    const query = "SELECT * FROM retreading WHERE id = ?";
    db.query(query, [id], callback);
  },

  getApprovedRetreadings: (callback) => {
    const query = "SELECT * FROM retreading WHERE status = 'Approved'";
    db.query(query, callback);
  },

  updateStatusByServiceId: (serviceId, newStatus, callback) => {
    const query = "UPDATE services SET status = ? WHERE service_id = ?";
    db.query(query, [newStatus, serviceId], callback);
  },

  insertRejectOrder: (serviceId, customerId, note, callback) => {
    const query = "INSERT INTO reject_orders (service_id, customer_id, note) VALUES (?, ?, ?)";
    db.query(query, [serviceId, customerId, note], callback);
  }
};

module.exports = RetreadingModel;
