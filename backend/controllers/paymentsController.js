const PaymentsModel = require('../models/paymentsModel');

const PaymentsController = {
  getAllPayments: async (req, res) => {
    try {
      const payments = await PaymentsModel.getAllWorkerPayments();
      res.status(200).json(payments);
    } catch (error) {
      console.error('Database fetch error:', error);
      res.status(500).json({ message: 'Failed to retrieve payments' });
    }
  },

  addPayment: async (req, res) => {
    try {
      const {
        assignedWorker,
        MonthAttendDates,
        amount,
        bonus,
        note,
        date,
        status
      } = req.body;

      const safeValues = [
        assignedWorker || null,
        MonthAttendDates || null,
        amount || null,
        bonus || null,
        note || null,
        date || null,
        status || null
      ];

      const result = await PaymentsModel.addWorkerPayment(safeValues);
      res.json({ message: "Payment added successfully", id: result.insertId });
    } catch (err) {
      console.error("Error inserting payment:", err);
      res.status(500).json({ error: "Error inserting payment" });
    }
  },

  updatePayment: async (req, res) => {
    const { id } = req.params;
    const { assignedWorker, amount, date, status } = req.body;

    try {
      const safeValues = [
        assignedWorker || null,
        amount || null,
        date || null,
        status || null
      ];

      const result = await PaymentsModel.updateWorkerPayment(id, safeValues);

      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Payment updated successfully' });
      } else {
        res.status(404).json({ message: 'Payment not found' });
      }
    } catch (error) {
      console.error('Database update error:', error);
      res.status(500).json({ message: 'Failed to update payment' });
    }
  },

  getLatestPayment: async (req, res) => {
    const { customerId } = req.params;
    try {
      const latest = await PaymentsModel.getLatestCustomerPayment(customerId);
      if (!latest) {
        return res.status(404).json({ message: 'No payment found' });
      }
      res.json(latest);
    } catch (err) {
      console.error("Error fetching latest payment:", err);
      res.status(500).json({ error: "Database error" });
    }
  },

  getWorkerPayments: async (req, res) => {
    const { workerId } = req.params;
    try {
      const payments = await PaymentsModel.getWorkerPaymentsById(workerId);
      res.status(200).json(payments);
    } catch (error) {
      console.error("Error fetching worker payments:", error);
      res.status(500).json({ message: 'Error fetching worker payments' });
    }
  }
};

module.exports = PaymentsController;
