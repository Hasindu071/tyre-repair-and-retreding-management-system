import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/MyAttendance.css";
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar"; // Use a navbar appropriate for workers

const MyAttendance = () => {
    // For production, the worker's ID would come from authentication.
    // Here it is hardcoded for demonstration purposes.
    const workerId = 21; 
    const [attendanceDates, setAttendanceDates] = useState([]);
    const today = new Date();
    const todayDisplay = today.toLocaleDateString();

    // Fetch the worker's attendance history when the component mounts
    useEffect(() => {
        axios
            .get(`http://localhost:5000/attendance/worker/${workerId}`)
            .then((res) => {
                // Expecting res.data.attendances as an array of date strings in "YYYY-MM-DD" format
                const formattedAttendances = res.data.attendances.map(date => date.slice(0, 10));
                setAttendanceDates(formattedAttendances);
            })
            .catch((err) => {
                console.error("Error fetching attendance:", err);
            });
    }, [workerId]);

    // Generate an array of Date objects (or null for empty cells)
    const generateCalendar = () => {
        const year = today.getFullYear();
        const month = today.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay();
        const daysArray = [];

        // Add empty cells for days before the first day of month
        for (let i = 0; i < startDay; i++) {
            daysArray.push(null);
        }
        // Add Date objects for each day of the month
        for (let d = 1; d <= daysInMonth; d++) {
            daysArray.push(new Date(year, month, d));
        }
        return daysArray;
    };

    return (
        <div>
            <WorkerNavbar />
            <div className="worker-attendance-container">
                <h2>My Attendance</h2>
                <p>Today: {todayDisplay}</p>
                <div className="calendar-grid">
                    {generateCalendar().map((date, index) => {
                        if (!date) {
                            return (
                                <div key={index} className="calendar-cell empty-cell"></div>
                            );
                        }
                        const dateISO = date.toISOString().slice(0, 10);
                        const attended = attendanceDates.includes(dateISO);
                        return (
                            <div
                                key={index}
                                className={`calendar-cell ${attended ? "attended-cell" : "not-attended-cell"}`}
                            >
                                <div className="date-number">{date.getDate()}</div>
                                <div className="attendance-status">
                                    {attended ? "Present" : "Absent"}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MyAttendance;