const express = require('express');
const router = express.Router();
const AttendanceMarkController = require('../controllers/attendanceMarkController');

router.post('/mark', AttendanceMarkController.mark);
router.get('/worker/:id', AttendanceMarkController.getHistory);
router.get('/workerAttend/:id', AttendanceMarkController.getMonthly);

module.exports = router;
