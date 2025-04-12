const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection

// Route to fetch all payments
router.get('/getPayments', async (req, res) => {
    try {
        const [payments] = await db.promise().execute('SELECT * FROM worker_payments');
        res.status(200).json(payments);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).json({ message: 'Failed to retrieve payments' });
    }
});

// Route to add a new payment
router.post('/addPayment', (req, res) => {
    const {
      assignedWorker,
      MonthAttendDates,
      amount,
      bonus,
      note,
      date,
      status
    } = req.body;
    
    // Convert undefined values to null
    const safeAssignedWorker = assignedWorker !== undefined ? assignedWorker : null;
    const safeMonthAttendDates = MonthAttendDates !== undefined ? MonthAttendDates : null;
    const safeAmount = amount !== undefined ? amount : null;
    const safeBonus = bonus !== undefined ? bonus : null;
    const safeNote = note !== undefined ? note : null;
    const safeDate = date !== undefined ? date : null;
    const safeStatus = status !== undefined ? status : null;
  
    const query = `
      INSERT INTO Worker_Payments 
      (assignedWorker, MonthAttendDates, amount, bonus, note, date, status)
      VALUES (?,?,?,?,?,?,?)
    `;
    
    db.query(query, [safeAssignedWorker, safeMonthAttendDates, safeAmount, safeBonus, safeNote, safeDate, safeStatus], (err, results) => {
      if (err) {
        console.error("Error inserting payment:", err);
        return res.status(500).json({ error: "Error inserting payment" });
      }
      res.json({ message: "Payment added successfully", id: results.insertId });
    });
  });

// Route to update an existing payment
router.put('/updatePayment/:id', async (req, res) => {
    const { id } = req.params;
    const { assignedWorker, amount, date, status } = req.body;

    // Convert undefined values to null
    const safeAssignedWorker = assignedWorker !== undefined ? assignedWorker : null;
    const safeAmount = amount !== undefined ? amount : null;
    const safeDate = date !== undefined ? date : null;
    const safeStatus = status !== undefined ? status : null;

    try {
        const query = 'UPDATE worker_payments SET assignedWorker = ?, amount = ?, date = ?, status = ? WHERE id = ?';
        const [result] = await db.promise().execute(query, [safeAssignedWorker, safeAmount, safeDate, safeStatus, id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Payment updated successfully' });
        } else {
            res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        console.error('Database update error:', error);
        res.status(500).json({ message: 'Failed to update payment' });
    }
});

module.exports = router;