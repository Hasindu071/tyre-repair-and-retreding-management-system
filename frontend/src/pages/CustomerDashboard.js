import React from "react";
import { useNavigate } from "react-router-dom";
import NewNavbar from "../components/Navbars/CustomerRegiNavBar";
import { FaShoppingCart, FaClipboardList, FaMoneyBillAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/CustomerDashboard.css";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook

const CustomerDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth(); // Get user details from context

    // Determine the user's display name
    const getDisplayName = () => {
        if (user && user.fullName) {
            return user.fullName;
        }
        return user?.email || "Customer";
    };

    const handlePlaceOrder = () => {
        toast.info("Navigating to Place Your Order page");
        navigate("/service");
    };

    const handleMyOrders = () => {
        toast.info("Fetching your orders...");
        navigate("/MyOrders");
    };

    const handlePaymentBilling = () => {
        toast.info("Redirecting to Payment & Billing");
        navigate("/CustomerSeePaymentBilling");
    };

    return (
        <div>
            <NewNavbar />
            <div className="customer-dashboard-container">
                <div className="customer-dashboard-card">
                    <h2 className="customer-dashboard-title">Welcome, {getDisplayName()}!</h2>
                    <p className="customer-dashboard-subtitle">
                        Manage your profile, orders, and explore products.
                    </p>
                    <div className="customer-dashboard-grid">
                        <div className="customer-dashboard-item">
                            <FaShoppingCart size={50} className="customer-dashboard-icon" />
                            <h3>Place Your Order</h3>
                            <button className="customer-dashboard-button" onClick={handlePlaceOrder}>
                                View
                            </button>
                        </div>
                        <div className="customer-dashboard-item">
                            <FaClipboardList size={50} className="customer-dashboard-icon" />
                            <h3>My Orders</h3>
                            <button className="customer-dashboard-button" onClick={handleMyOrders}>
                                View
                            </button>
                        </div>
                        <div className="customer-dashboard-item">
                            <FaMoneyBillAlt size={50} className="customer-dashboard-icon" />
                            <h3>Payment & Billing</h3>
                            <button className="customer-dashboard-button" onClick={handlePaymentBilling}>
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CustomerDashboard;
