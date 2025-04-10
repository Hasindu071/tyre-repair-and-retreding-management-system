import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/MyAttendance.css";
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar";

const MyAttendance = () => {
    const workerId = 21;
    const [attendanceDates, setAttendanceDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();

    const todayDisplay = new Date().toLocaleDateString();

    // Fetch attendance for the selected month
    useEffect(() => {
        const year = selectedYear;
        const month = selectedMonth + 1; // Months are 1-indexed for backend

        axios
            .get(`http://localhost:5000/attendance/worker/${workerId}?year=${year}&month=${month}`)
            .then((res) => {
                const formattedAttendances = res.data.attendances.map(date => date.slice(0, 10));
                setAttendanceDates(formattedAttendances);
            })
            .catch((err) => {
                console.error("Error fetching attendance:", err);
            });
    }, [workerId, selectedMonth, selectedYear]);

    const generateCalendar = () => {
        const firstDay = new Date(selectedYear, selectedMonth, 1);
        const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDay = firstDay.getDay();
        const daysArray = [];

        for (let i = 0; i < startDay; i++) {
            daysArray.push(null);
        }
        for (let d = 1; d <= daysInMonth; d++) {
            daysArray.push(new Date(selectedYear, selectedMonth, d));
        }
        return daysArray;
    };

    const handleMonthChange = (direction) => {
        const newDate = new Date(selectedYear, selectedMonth + direction, 1);
        setSelectedDate(newDate);
    };

    const totalPresentDays = attendanceDates.length;

    return (
        <div>
            <WorkerNavbar />
            <div className="worker-attendance-container">
                <h2>My Attendance</h2>
                <p>Today: {todayDisplay}</p>

                <div className="month-navigation">
                    <button onClick={() => handleMonthChange(-1)}>Previous</button>
                    <span>{monthNames[selectedMonth]} {selectedYear}</span>
                    <button onClick={() => handleMonthChange(1)}>Next</button>
                </div>

                <p>Total Days Present in {monthNames[selectedMonth]}: {totalPresentDays}</p>

                <div className="calendar-grid">
                    {generateCalendar().map((date, index) => {
                        if (!date) {
                            return <div key={index} className="calendar-cell empty-cell"></div>;
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
