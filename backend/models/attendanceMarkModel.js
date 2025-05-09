const db = require('../config/db');

// Check if today's attendance is already marked
const checkTodayAttendance = (workerId, date) => {
    const query = "SELECT * FROM worker_attendance WHERE worker_id = ? AND date = ?";
    return db.promise().execute(query, [workerId, date]);
};

// Mark attendance
const markAttendance = (workerId, date) => {
    const query = "INSERT INTO worker_attendance (worker_id, date) VALUES (?, ?)";
    return db.promise().execute(query, [workerId, date]);
};

// Get full attendance history
const getAttendanceHistory = (workerId) => {
    const query = "SELECT date FROM worker_attendance WHERE worker_id = ? ORDER BY date ASC";
    return db.promise().execute(query, [workerId]);
};

// Get attendance by month/year
const getMonthlyAttendance = (workerId, year, month) => {
    const query = `
        SELECT date 
        FROM worker_attendance 
        WHERE worker_id = ? 
        AND YEAR(date) = ? 
        AND MONTH(date) = ?
        ORDER BY date ASC`;
    return db.promise().execute(query, [workerId, year, month]);
};

module.exports = {
    checkTodayAttendance,
    markAttendance,
    getAttendanceHistory,
    getMonthlyAttendance
};
