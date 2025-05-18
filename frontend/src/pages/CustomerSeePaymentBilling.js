import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomerSidebar from "../components/CustomerSidebar";
import Logo from "../assets/Logo.png";
import "../styles/CustomerSeePaymentBilling.css";
import { useAuth } from "../context/AuthContext";
import { getLatestPayment, getPreviousPayments } from "../services/PaymentService";

const CustomerSeePaymentBilling = () => {
    const navigate = useNavigate();
    const [latestPayment, setLatestPayment] = useState(null);
    const [previousPayments, setPreviousPayments] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const { userID } = useAuth();
    const userId = userID;

    useEffect(() => {
        if (userId) {
            // Fetch latest payment
            getLatestPayment(userId)
                .then((data) => setLatestPayment(data))
                .catch((err) => console.error("Error fetching payment:", err));
            // Fetch previous payments (history)
            getPreviousPayments(userId)
                .then((data) => setPreviousPayments(data))
                .catch((err) =>
                    console.error("Error fetching previous payments:", err)
                );
        }
    }, [userId]);

    const handleBack = () => navigate(-1);
    const handlePrint = () => window.print();
    const toggleHistory = () => setShowHistory((prev) => !prev);

    // Function to print a specific receipt by opening a new window with its HTML content.
    const printReceipt = (elementId) => {
        const printContents = document.getElementById(elementId).innerHTML;
        const newWindow = window.open("", "", "width=800,height=600");
        newWindow.document.write("<html><head><title>Print Receipt</title>");
        newWindow.document.write("<link rel='stylesheet' href='CustomerSeePaymentBilling.css' type='text/css' />");
        newWindow.document.write("</head><body>");
        newWindow.document.write(printContents);
        newWindow.document.write("</body></html>");
        newWindow.document.close();
        newWindow.focus();
        newWindow.print();
        newWindow.close();
    };

    return (
        <div>
            <CustomerSidebar />
            <div className="receipt-wrapper">
                <div className="receipt-container">
                    <div className="header">
                        <img src={Logo} alt="Ryak Tires Logo" className="logo" />
                        <h1 className="company-name">Reyak Tyres</h1>
                        <p className="receipt-tagline">
                            Your trusted partner for retreading &amp; repairing
                        </p>
                        <hr />
                        <h2 className="receipt-title">
                            {latestPayment ? "Latest Payment Receipt" : "Payment Receipt"}
                        </h2>
                    </div>

                    {latestPayment ? (
                        <div id="latest-receipt" className="receipt-content">
                            <p><strong>Receipt No:</strong> {latestPayment.id}</p>
                            <p><strong>Customer ID:</strong> {latestPayment.customer_ID}</p>
                            <p><strong>Order ID:</strong> {latestPayment.order_id}</p>
                            <p>
                            <strong>Date:</strong> {latestPayment.payment_date 
                                ? new Date(latestPayment.payment_date).toLocaleDateString('en-US', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                })
                                : "N/A"}
                            </p>
                            <hr />
                            <p><strong>Amount:</strong> Rs {latestPayment.amount}</p>
                            <p>
                                <strong>Delivery Fee:</strong> Rs {latestPayment.delivery_fee}
                            </p>
                            <p><strong>Net Amount:</strong> Rs {latestPayment.net_amount}</p>
                            <p>
                                <strong>Payment Method:</strong> {latestPayment.payment_method}
                            </p>
                            <p><strong>Note:</strong> {latestPayment.note}</p>
                            <hr />
                            <p className="thank-you-msg">
                                Thank you for your payment! We appreciate your business.
                            </p>
                            <button className="print-btn-preview" onClick={() => printReceipt("latest-receipt")}>🖨️ Print This Receipt</button>
                        </div>
                    ) : (
                        <p>Loading latest payment details...</p>
                    )}

                    <hr />

                    <button onClick={toggleHistory} className="history-toggle-btn">
                        {showHistory ? "Hide History" : "Show History"}
                    </button>

                    {showHistory && (
                        <div className="previous-payments">
                            <h2 className="receipt-title">Previous Payment Records</h2>
                            {previousPayments.length > 0 ? (
                                previousPayments.map((payment) => (
                                    <div key={payment.id} id={`receipt-${payment.id}`} className="receipt-content">
                                        <p>
                                            <strong>Receipt No:</strong> {payment.id}
                                        </p>
                                        <p>
                                        <strong>Date:</strong> {payment.payment_date 
                                            ? new Date(payment.payment_date).toLocaleDateString('en-US', {
                                                day: '2-digit',
                                                month: 'long',
                                                year: 'numeric'
                                            })
                                            : "N/A"}
                                        </p>
                                        <p>
                                            <strong>Amount:</strong> Rs {payment.amount}
                                        </p>
                                        <p>
                                            <strong>Delivery Fee:</strong> Rs {payment.delivery_fee}
                                        </p>
                                        <p>
                                            <strong>Net Amount:</strong> Rs {payment.net_amount}
                                        </p>
                                        <p>
                                            <strong>Payment Method:</strong> {payment.payment_method}
                                        </p>
                                        <p>
                                            <strong>Note:</strong> {payment.note}
                                        </p>
                                        <hr />
                                        <button className="print-btn-preview" onClick={() => printReceipt(`receipt-${payment.id}`)}>
                                            🖨️ Print This Receipt
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p>No previous payment records found.</p>
                            )}
                        </div>
                    )}

                    <div className="receipt-buttons">
                        <button onClick={handlePrint}>🖨️ Print Entire Page</button>
                        <button onClick={handleBack}>🔙 Back</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerSeePaymentBilling;