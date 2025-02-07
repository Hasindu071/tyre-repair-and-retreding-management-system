import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar"; // Assuming you have a Navbar component
import "../styles/OwnerDashboard.css"; // Import the CSS file

const OwnerDashboard = () => {
    const navigate = useNavigate();

    const ApproveWorker = () => {
        navigate("/ApproveWorker"); // Redirect to ApproveWorker page
    };

    return (
        <div>
            <Navbar />
            <div className="owner-dashboard-container">
                <h2 className="owner-dashboard-title">Owner Dashboard</h2>
                <p className="owner-dashboard-subtitle">Manage operations efficiently</p>

                <div className="owner-dashboard-grid">
                    {/* Approve Customer Orders */}
                    <div className="dashboard-section">
                        <h3>Approve Customer Orders</h3>
                        <button className="dashboard-button">View Orders</button>
                    </div>

                    {/* Assign Workers */}
                    <div className="dashboard-section">
                        <h3>Assign Workers</h3>
                        <button className="dashboard-button">Assign</button>
                    </div>

                    {/* Approve New Workers */}
                    <div className="dashboard-section">
                        <h3>Approve New Workers</h3>
                        <button className="dashboard-button" onClick={ApproveWorker}>Approve</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboard;