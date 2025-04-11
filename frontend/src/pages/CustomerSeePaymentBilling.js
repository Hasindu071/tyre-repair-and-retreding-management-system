import React from "react";
import { useNavigate } from "react-router-dom";
import CustomerSidebar from "../components/CustomerSidebar"; // Assuming you have a sidebar component
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/CustomerSeePaymentBilling.css"; // Create and update this file for custom styling

const CustomerSeePaymentBilling = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div>
            <CustomerSidebar />
            <div className="payment-billing-container">
                <h2 className="payment-billing-title">Payment & Billing Information</h2>
                <p className="payment-billing-description">
                    View your billing details and manage your payments here.
                </p>
                <div className="payment-billing-details">
                    {/* Placeholder content; replace with actual billing details */}
                    <p>No billing information available at this time.</p>
                </div>
                <button 
                    className="payment-billing-back-button" 
                    onClick={handleBack}>
                    Back
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CustomerSeePaymentBilling;