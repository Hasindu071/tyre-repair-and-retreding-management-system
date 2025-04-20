import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomerSidebar from "../components/CustomerSidebar";
import axios from "axios";
import "../styles/CustomerSeePaymentBilling.css";

const CustomerSeePaymentBilling = () => {
    const navigate = useNavigate();
    const [latestPayment, setLatestPayment] = useState(null);
    const customerId = 16; // Replace with logged-in user's ID

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
            <div className="receipt-container">
                <h2 className="receipt-title">Payment Receipt</h2>

                {latestPayment ? (
                    <div className="receipt-box">
                        <p><strong>Receipt ID:</strong> {latestPayment.id}</p>
                        <p><strong>Order ID:</strong> {latestPayment.order_id}</p>
                        <p><strong>Payment Date:</strong> {latestPayment.payment_date}</p>
                        <hr />
                        <p><strong>Amount:</strong> Rs {latestPayment.amount}</p>
                        <p><strong>Delivery Fee:</strong> Rs {latestPayment.delivery_fee}</p>
                        <p><strong>Total (Net Amount):</strong> Rs {latestPayment.net_amount}</p>
                        <p><strong>Payment Method:</strong> {latestPayment.payment_method}</p>
                        <p><strong>Note:</strong> {latestPayment.note}</p>
                        <hr />
                        <p className="thank-you-msg">Thank you for your payment!</p>
                    </div>
                ) : (
                    <p>Loading payment details...</p>
                )}

                <button className="generate-receipt-btn" onClick={handlePrint}>Generate Receipt</button>
                <button className="back-btn" onClick={handleBack}>Back</button>
            </div>
        </div>
    );
};

export default CustomerSeePaymentBilling;
