import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./NavBar"; // Assuming you have a Navbar component
import "../styles/CustomerDashboard.css"; // Import the CSS file

const CustomerDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log("Customer logged out");
        navigate("/login"); // Redirect to login page
    };

    return (
        <div>
            <Navbar />
            <div className="customer-dashboard-container">
                <div className="customer-dashboard-card">
                    <h2 className="customer-dashboard-title">Welcome, Customer!</h2>
                    <p className="customer-dashboard-subtitle">
                        Manage your profile, orders, and explore products.
                    </p>

                    <div className="customer-dashboard-grid">
                        <div className="dashboard-item">
                            <h3>My Profile</h3>
                            <p>Update personal details & password</p>
                            <button className="dashboard-button">View</button>
                        </div>

                        <div className="dashboard-item">
                            <h3>My Orders</h3>
                            <p>Check your order history</p>
                            <button className="dashboard-button">View</button>
                        </div>

                        <div className="dashboard-item">
                            <h3>Shop</h3>
                            <p>Explore new products</p>
                            <button className="dashboard-button">View</button>
                        </div>

                        <div className="dashboard-item">
                            <h3>Support</h3>
                            <p>Contact customer service</p>
                            <button className="dashboard-button">View</button>
                        </div>
                    </div>

                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
