import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomerSidebar from "../components/CustomerSidebar";
import Logo from '../assets/Logo.png'; // Adjust path accordingly
import axios from "axios";
import "../styles/CustomerSeePaymentBilling.css";

const CustomerSeePaymentBilling = () => {
    const navigate = useNavigate();
    const [latestPayment, setLatestPayment] = useState(null);
    const customerId = 16; // Replace with dynamic ID if needed

    useEffect(() => {
        axios
            .get(`http://localhost:5000/payments/latest/${customerId}`)
            .then((res) => setLatestPayment(res.data))
            .catch((err) => console.error("Error fetching payment:", err));
    }, []);

    const handleBack = () => navigate(-1);
    const handlePrint = () => window.print();

    return (
        <div>
            <CustomerSidebar />
            <div className="receipt-wrapper">
                <div className="receipt-container">
                    <div className="header">
                    <img src={Logo} alt="Ryak Tires Logo" className="logo" />
                        <h1 className="company-name">Reyak Tyres</h1>
                        <p className="receipt-tagline">Your trusted partner for retreading & repairing</p>
                        <hr />
                        <h2 className="receipt-title">Payment Receipt</h2>
                    </div>

                    {latestPayment ? (
                        <div className="receipt-content">
                            <p><strong>Receipt No:</strong> {latestPayment.id}</p>
                            <p><strong>Customer ID:</strong> {latestPayment.customer_ID}</p>
                            <p><strong>Order ID:</strong> {latestPayment.order_id}</p>
                            <p><strong>Date:</strong> {latestPayment.payment_date}</p>
                            <hr />
                            <p><strong>Amount:</strong> Rs {latestPayment.amount}</p>
                            <p><strong>Delivery Fee:</strong> Rs {latestPayment.delivery_fee}</p>
                            <p><strong>Net Amount:</strong> Rs {latestPayment.net_amount}</p>
                            <p><strong>Payment Method:</strong> {latestPayment.payment_method}</p>
                            <p><strong>Note:</strong> {latestPayment.note}</p>
                            <hr />
                            <p className="thank-you-msg">Thank you for your payment! We appreciate your business.</p>
                        </div>
                    ) : (
                        <p>Loading payment details...</p>
                    )}

                    <div className="receipt-buttons">
                        <button onClick={handlePrint}>🖨️ Print Receipt</button>
                        <button onClick={handleBack}>🔙 Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerSeePaymentBilling;
