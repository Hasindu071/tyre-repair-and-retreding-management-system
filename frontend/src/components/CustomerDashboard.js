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

    const handlePlaceOrder = () => {
        navigate("/service"); // Redirect to ChooseService page
    };

    const MyOrders = () => {
        navigate("/MyOrders"); // Redirect to MyOrders page
    };

    const MyProfile = () => {
        navigate("/MyProfile"); // Redirect to MyOrders page
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
                            <h3>Place Your Order</h3>
                            <button className="dashboard-button" onClick={handlePlaceOrder}>View</button>
                        </div>

                        <div className="dashboard-item">
                            <h3>My Orders</h3>
                            <button className="dashboard-button" onClick={MyOrders}>View</button>
                        </div>

                        <div className="dashboard-item">
                            <h3>My Profile</h3>
                            <button className="dashboard-button" onClick={MyProfile}>View</button>
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
