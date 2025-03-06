import React from "react";
import { useNavigate } from "react-router-dom";
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar"; // Assuming you have a Navbar component
import "../styles/WorkerDashboard.css"; // Import the CSS file

const WorkerDashboard = () => {
    const navigate = useNavigate();

    return (
        <div>
            <WorkerNavbar />
            <div className="worker-dashboard-container">
                <h2 className="worker-dashboard-title">Worker Dashboard</h2>
                <p className="worker-dashboard-subtitle">
                    Manage your assigned tasks efficiently
                </p>

                <div className="worker-dashboard-grid">
                    {/* Task List */}
                    <div className="dashboard-section">
                        <h3>Assigned Tasks</h3>
                        <div className="button-container">
                            <button
                                className="task-button"
                                onClick={() => navigate("/view-tasks")}
                            >
                                View Tasks
                            </button>
                            <button
                                className="task-button"
                                onClick={() => navigate("/update-progress")}
                            >
                                Update Progress
                            </button>
                            <button
                                className="task-button"
                                onClick={() => navigate("/complete-task")}
                            >
                                Complete Task
                            </button>
                        </div>
                    </div>

                    {/* Profile Overview */}
                    <div className="dashboard-section">
                        <h3>History of Our Works</h3>
                        <div className="button-container">
                            <button
                                className="profile-button"
                                onClick={() => navigate("/history-of-works")}
                            >
                                History of Our Works
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerDashboard;