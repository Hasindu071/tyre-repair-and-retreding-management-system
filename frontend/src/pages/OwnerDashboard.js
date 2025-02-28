import React from "react";
import { useNavigate } from "react-router-dom";
import { FaClipboardCheck, FaUsers, FaUserPlus, FaShoppingCart, FaBox, FaDollarSign } from 'react-icons/fa';
import OwnerNavbar from "../components/Navbars/OwnerRegiNavBar"; // Assuming you have a Navbar component
import "../styles/OwnerDashboard.css"; // Import the CSS file


const OwnerDashboard = () => {
    const navigate = useNavigate();

    const ApproveWorker = () => {
        navigate("/ApproveWorker"); // Redirect to ApproveWorker page
    };

    const ApproveOrder = () => {
        navigate("/ApproveOrder"); // Redirect to ApproveOrder page
    };

    const AssingWorker = () => {
        navigate("/AssignWorker"); // Redirect to AssignWorker page
    }

    const HandleCustomer = () => {
        navigate("/CustomerHandle"); // Redirect to HandleCustomer page
    }

    const productInquiries = () => {
        navigate("/OwnerProductInquiries"); // Redirect to productInquiries page
    }

    const WokerPayments = () => {
        navigate("/Owner/SeePayment"); // Redirect to WokerPayments page
    }

    const CustomerPayments = () => {
        navigate("/Owner/SeeCustomerPayment"); // Redirect to CustomerPayments page
    }

    const CustomerNotice = () => {
        navigate("/Owner/SendNotice"); // Redirect to CustomerNotice page
    }

    return (
        <div>
            <OwnerNavbar />
            <div className="owner-dashboard-container">
                <h2 className="owner-dashboard-title">Owner Dashboard</h2>
                <p className="owner-dashboard-subtitle">Manage operations efficiently</p>

                <div className="owner-dashboard-grid">
                    {/* Approve Customer Orders */}
                    <div className="dashboard-section-owner">
                        <h3>Approve Customer Orders</h3>
                        <button className="dashboard-button-owner" onClick={ApproveOrder}>
                            <FaClipboardCheck className="icon" /> View Orders
                        </button>
                    </div>

                    {/* Assign Workers */}
                    <div className="dashboard-section-owner">
                        <h3>Assign Workers</h3>
                        <button className="dashboard-button-owner" onClick={AssingWorker}>
                            <FaUsers className="icon" /> Assign
                        </button>
                    </div>

                    {/* Approve New Workers */}
                    <div className="dashboard-section-owner">
                        <h3>Approve New Workers</h3>
                        <button className="dashboard-button-owner" onClick={ApproveWorker}>
                            <FaUserPlus className="icon" /> Approve
                        </button>
                    </div>

                    {/* Handle Customer */}
                    <div className="dashboard-section-owner">
                        <h3>Handle Customer</h3>
                        <button className="dashboard-button-owner" onClick={HandleCustomer}>
                            <FaShoppingCart className="icon" /> Approve
                        </button>
                    </div>

                    {/* Product Inquiries */}
                    <div className="dashboard-section-owner">
                        <h3>Product Inquiries</h3>
                        <button className="dashboard-button-owner" onClick={productInquiries}>
                            <FaBox className="icon" /> Approve
                        </button>
                    </div>

                    {/* Worker Payments */}
                    <div className="dashboard-section-owner">
                        <h3>Worker Payments</h3>
                        <button className="dashboard-button-owner" onClick={WokerPayments}>
                            <FaDollarSign className="icon" /> Approve
                        </button>
                    </div>

                    {/* Customer Payments */}
                    <div className="dashboard-section-owner">
                        <h3>Customer Payments</h3>
                        <button className="dashboard-button-owner" onClick={CustomerPayments}>
                            <FaDollarSign className="icon" /> Approve
                        </button>
                    </div>

                    {/* Customer Notice */}
                    <div className="dashboard-section-owner">
                        <h3>Customer Notice</h3>
                        <button className="dashboard-button-owner" onClick={CustomerNotice}>
                            <FaDollarSign className="icon" /> Approve
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboard;