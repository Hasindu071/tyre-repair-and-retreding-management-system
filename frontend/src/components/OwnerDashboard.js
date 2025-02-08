import React from "react";
import { useNavigate } from "react-router-dom";
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
                        <button className="dashboard-button-owner"  onClick={ApproveOrder}>View Orders</button>
                    </div>

                    {/* Assign Workers */}
                    <div className="dashboard-section-owner">
                        <h3>Assign Workers</h3>
                        <button className="dashboard-button-owner" onClick={AssingWorker}>Assign</button>
                    </div>

                    {/* Approve New Workers */}
                    <div className="dashboard-section-owner">
                        <h3>Approve New Workers</h3>
                        <button className="dashboard-button-owner" onClick={ApproveWorker}>Approve</button>
                    </div>

                    {/* Handle Customer */}
                    <div className="dashboard-section-owner">
                        <h3>Handle Customer</h3>
                        <button className="dashboard-button-owner" onClick={HandleCustomer}>Approve</button>
                    </div>

                    {/* product inquiries */}
                    <div className="dashboard-section-owner">
                        <h3>product inquiries</h3>
                        <button className="dashboard-button-owner" onClick={productInquiries}>Approve</button>
                    </div>

                    {/* Woker payments */}
                    <div className="dashboard-section-owner">
                        <h3>Woker payments</h3>
                        <button className="dashboard-button-owner" onClick={WokerPayments}>Approve</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboard;