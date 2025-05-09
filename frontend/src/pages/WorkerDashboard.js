import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar";
import { FaMoneyBillAlt } from "react-icons/fa";
import "../styles/WorkerDashboard.css";
import { getWorkerProfileDashboard } from "../services/workerServices";

const WorkerDashboard = () => {
    const navigate = useNavigate();
    const [workerId, setWorkerId] = useState("");
    const [workerName, setWorkerName] = useState("");

    useEffect(() => {
        const id = localStorage.getItem("workerId");
        if (id) {
            setWorkerId(id);
            getWorkerProfileDashboard(id)
                .then((data) => {
                    if (data && data.firstName && data.lastName) {
                        setWorkerName(`${data.firstName} ${data.lastName}`);
                    }
                })
                .catch((err) => {
                    console.error("Error fetching worker details:", err);
                });
        }
    }, []);

    return (
        <div className="dashboard-wrapper">
            <WorkerNavbar />
            <div className="worker-dashboard-container">
                <header className="dashboard-header">
                    <h2 className="worker-dashboard-title">Worker Dashboard</h2>
                    <p className="worker-dashboard-subtitle">
                        {workerName
                            ? `Welcome, ${workerName}`
                            : "Manage your assigned tasks efficiently"}
                    </p>
                </header>
                <section className="dashboard-actions">
                    <div className="dashboard-section creative-section">
                        <button 
                            className="task-button creative-button"
                            onClick={() => navigate("/view-tasks")}
                        >
                            <span className="button-icon">📋</span>
                            View Tasks
                        </button>
                        <button 
                            className="task-button creative-button"
                            onClick={() => navigate("/update-progress")}
                        >
                            <span className="button-icon">⏱️</span>
                            Update Progress
                        </button>
                        <button 
                            className="task-button creative-button"
                            onClick={() => navigate("/complete-task")}
                        >
                            <span className="button-icon">✅</span>
                            Complete Task
                        </button>
                        <button 
                            className="profile-button creative-button"
                            onClick={() => navigate("/WokerAttendance")}
                        >
                            <span className="button-icon">📅</span>
                            My Attendance
                        </button>
                        <button 
                            className="profile-button creative-button"
                            onClick={() => navigate("/WorkerSeePaymentBilling")}
                        >
                            <FaMoneyBillAlt size={28} className="button-icon" /> Payment & Billing
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default WorkerDashboard;