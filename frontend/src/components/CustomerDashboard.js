import React from "react";
import { useNavigate } from "react-router-dom";
import NewNavbar from "../components/Navbars/CustomerRegiNavBar"; // Navbar component
import { FaShoppingCart, FaClipboardList } from "react-icons/fa"; // Importing icons
import "../styles/CustomerDashboard.css"; // Import CSS file

const CustomerDashboard = () => {
    const navigate = useNavigate();

    const handlePlaceOrder = () => {
        navigate("/service"); // Redirect to ChooseService page
    };

    const handleMyOrders = () => {
        navigate("/MyOrders"); // Redirect to MyOrders page
    };

    return (
        <div>
            <NewNavbar />
            <div className="customer-dashboard-container">
                <div className="customer-dashboard-card">
                    <h2 className="customer-dashboard-title">Welcome, Customer!</h2>
                    <p className="customer-dashboard-subtitle">
                        Manage your profile, orders, and explore products.
                    </p>

                    <div className="customer-dashboard-grid">
                        {/* Place Order Section */}
                        <div className="dashboard-item">
                            <FaShoppingCart size={50} className="dashboard-icon" />
                            <h3>Place Your Order</h3>
                            <button className="dashboard-button" onClick={handlePlaceOrder}>
                                View
                            </button>
                        </div>

                        {/* My Orders Section */}
                        <div className="dashboard-item">
                            <FaClipboardList size={50} className="dashboard-icon" />
                            <h3>My Orders</h3>
                            <button className="dashboard-button" onClick={handleMyOrders}>
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;
