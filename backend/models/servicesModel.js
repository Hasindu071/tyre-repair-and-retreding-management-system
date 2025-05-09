const db = require('../../config/db');

const getRepairs = async () => {
  const [rows] = await db.promise().query(`
    SELECT r.*, s.tireBrand, s.internalStructure, s.receiveDate, s.notes, s.status AS serviceStatus, s.customer_ID, s.total_amount
    FROM repairing r
    JOIN services s ON r.id = s.service_id
  `);
  return rows;
};

const getRetreadings = async () => {
  const [rows] = await db.promise().query(`
    SELECT r.*, s.tireBrand, s.internalStructure, s.receiveDate, s.notes, s.status AS serviceStatus, s.customer_ID, s.total_amount
    FROM retreading r
    JOIN services s ON r.id = s.service_id
  `);
  return rows;
};

const getApprovedOrders = async () => {
  const [rows] = await db.promise().query(`
    SELECT * FROM services WHERE status = 'Checking'
  `);
  return rows;
};

const getAssignedOrders = async (workerId) => {
  let query = `
    SELECT o.*, s.service_id, s.status AS service_status, s.receiveDate, s.notes, s.tireBrand, s.internalStructure,
           e.firstName, e.lastName
    FROM orders o
    JOIN services s ON o.service_id = s.service_id
    LEFT JOIN worker_register e ON o.emp_id = e.id
    WHERE s.status = 'Approved'
  `;
  const params = [];

  if (workerId) {
    query += " AND o.emp_id = ?";
    params.push(workerId);
  }

  const [orders] = await db.promise().query(query, params);

  const detailedOrders = await Promise.all(orders.map(async (order) => {
    let serviceDetails = {};
    if (order.service_id.startsWith('RD')) {
      const [retreadingDetails] = await db.promise().query(`SELECT * FROM retreading WHERE id = ?`, [order.service_id]);
      serviceDetails = retreadingDetails[0];
    } else if (order.service_id.startsWith('RP')) {
      const [repairDetails] = await db.promise().query(`SELECT * FROM repairing WHERE id = ?`, [order.service_id]);
      serviceDetails = repairDetails[0];
    }
    return { ...order, serviceDetails };
  }));

  return detailedOrders;
};

const getPendingRepairs = async () => {
  const [rows] = await db.promise().query(`
    SELECT r.*, s.tireBrand, s.internalStructure, s.receiveDate, s.notes, s.status AS serviceStatus, s.customer_ID, s.total_amount
    FROM repairing r
    JOIN services s ON r.id = s.service_id
    WHERE s.status = 'Pending'
  `);
  return rows;
};

const getPendingRetreadings = async () => {
  const [rows] = await db.promise().query(`
    SELECT r.*, s.tireBrand, s.internalStructure, s.receiveDate, s.notes, s.status AS serviceStatus, s.customer_ID, s.total_amount
    FROM retreading r
    JOIN services s ON r.id = s.service_id
    WHERE s.status = 'Pending'
  `);
  return rows;
};

module.exports = {
  getRepairs,
  getRetreadings,
  getApprovedOrders,
  getAssignedOrders,
  getPendingRepairs,
  getPendingRetreadings
};
