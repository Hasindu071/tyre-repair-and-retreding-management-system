import React, { useState } from "react";
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar"; // Assuming you have a Navbar component
import "../styles/WorkerDashboard.css"; // Import the CSS file

const WorkerDashboard = () => {
    const [tasks, setTasks] = useState([
        { id: 1, description: "Repair front left tire", status: "Pending" },
        { id: 2, description: "Retread truck tires", status: "In Progress" },
    ]);

    const updateTaskStatus = (id, newStatus) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, status: newStatus } : task
        ));
    };

    return (
        <div>
            <WorkerNavbar />
            <div className="worker-dashboard-container">
                <h2 className="worker-dashboard-title">Worker Dashboard</h2>
                <p className="worker-dashboard-subtitle">Manage your assigned tasks efficiently</p>

                <div className="worker-dashboard-grid">
                    {/* Task List */}
                    <div className="dashboard-section">
                        <h3>Assigned Tasks</h3>
                        {tasks.map(task => (
                            <div key={task.id} className="dashboard-item">
                                <p>{task.description}</p>
                                <p>Status: <span className={`status ${task.status.toLowerCase().replace(" ", "-")}`}>{task.status}</span></p>
                                {task.status === "Pending" && (
                                    <button className="dashboard-button" onClick={() => updateTaskStatus(task.id, "In Progress")}>Start</button>
                                )}
                                {task.status === "In Progress" && (
                                    <button className="dashboard-button complete" onClick={() => updateTaskStatus(task.id, "Completed")}>Complete</button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Notifications */}
                    <div className="dashboard-section">
                        <h3>Notifications</h3>
                        <p>No new notifications</p>
                    </div>

                    {/* Profile Overview */}
                    <div className="dashboard-section">
                        <h3>Profile Overview</h3>
                        <p>Worker Name: John Doe</p>
                        <p>Role: Tire Repair Specialist</p>
                        <p>Tasks Completed: 10</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerDashboard;
