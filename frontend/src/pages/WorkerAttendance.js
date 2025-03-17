import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/WorkerAttendance.css";
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar";

const WorkerAttendance = () => {
    const [attendanceMarked, setAttendanceMarked] = useState(false);
    const [message, setMessage] = useState("");
    const [attendanceDates, setAttendanceDates] = useState([]);
    const today = new Date();
    const todayDisplay = today.toLocaleDateString();
    const todayISO = today.toISOString().slice(0, 10);

    // Fetch existing attendance dates for the worker
    useEffect(() => {
        axios.get("http://localhost:5000/attendance/worker/21")
            .then((res) => {
                // Expected response: { attendances: ["2025-03-01", "2025-03-15", ...] }
                setAttendanceDates(res.data.attendances);
                if (res.data.attendances.includes(todayISO)) {
                    setAttendanceMarked(true);
                }
            })
            .catch((err) => {
                console.error("Error fetching attendance:", err);
            });
    }, [todayISO]);

    const markAttendance = async () => {
        try {
            const res = await axios.post("http://localhost:5000/attendance/mark", { worker_id: 21 });
            if (res.status === 200) {
                setAttendanceMarked(true);
                setMessage("Attendance marked successfully!");
                // Optionally update the attendanceDates state with today
                setAttendanceDates((prev) => [...prev, todayISO]);
            }
        } catch (error) {
            console.error("Error marking attendance:", error);
            setMessage("Failed to mark attendance. Please try again.");
        }
    };

    // Generate array of dates and empty cells for offset for the current month
    const generateCalendar = () => {
        const year = today.getFullYear();
        const month = today.getMonth(); // 0-indexed
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay(); // 0 (Sunday) to 6 (Saturday)

        let daysArray = [];
        // Fill empty cells for days before the first day of the month
        for (let i = 0; i < startDay; i++) {
            daysArray.push(null);
        }
        // Fill in each day of the month
        for (let d = 1; d <= daysInMonth; d++) {
            daysArray.push(new Date(year, month, d));
        }
        return daysArray;
    };

    return (
        <div>
            <WorkerNavbar />
            <div className="worker-attendance-container">
                <h2>Worker Attendance</h2>
                <div className="today-display">
                    <p>Today: {todayDisplay}</p>
                    <button onClick={markAttendance} disabled={attendanceMarked}>
                        {attendanceMarked ? "Attendance Marked" : "Mark Attendance"}
                    </button>
                    {message && <p className="attendance-message">{message}</p>}
                </div>
                <h3>Attendance Calendar</h3>
                <div className="calendar-grid">
                    {generateCalendar().map((date, index) => {
                        if (!date) {
                            return <div key={index} className="calendar-cell empty-cell"></div>;
                        }
                        const dateISO = date.toISOString().slice(0, 10);
                        const attended = attendanceDates.includes(dateISO);
                        return (
                            <div key={index} className={`calendar-cell ${attended ? "attended-cell" : "not-attended-cell"}`}>
                                {date.getDate()}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default WorkerAttendance;