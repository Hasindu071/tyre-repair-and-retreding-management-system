const db = require('../config/db');

const PaymentsModel = {
  getAllWorkerPayments: async () => {
    const [rows] = await db.promise().execute('SELECT * FROM worker_payments');
    return rows;
  },

  addWorkerPayment: async (paymentData) => {
    const query = `
      INSERT INTO Worker_Payments 
      (assignedWorker, MonthAttendDates, amount, bonus, note, date, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.promise().execute(query, paymentData);
    return result;
  },

  updateWorkerPayment: async (id, updateData) => {
    const query = `
      UPDATE worker_payments 
      SET assignedWorker = ?, amount = ?, date = ?, status = ? 
      WHERE id = ?
    `;
    const [result] = await db.promise().execute(query, [...updateData, id]);
    return result;
  },

  getLatestCustomerPayment: async (customerId) => {
    const query = `
      SELECT * FROM customer_payments
      WHERE customer_ID = ?
      ORDER BY payment_date DESC, id DESC
      LIMIT 1
    `;
    const [rows] = await db.promise().execute(query, [customerId]);
    return rows[0] || null;
  },

  getWorkerPaymentsById: async (workerId) => {
    const [rows] = await db.promise().execute(
      'SELECT * FROM worker_payments WHERE assignedWorker = ?',
      [workerId]
    );
    return rows;
  },
};

module.exports = PaymentsModel;
