import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar";
import axios from "axios";
import "../styles/WorkerSeePaymentBilling.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkerSeePaymentBilling = () => {
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const workerId = localStorage.getItem("workerId"); // Retrieve logged in worker's ID

    useEffect(() => {
        fetchPayments();
        // eslint-disable-next-line
    }, []);

    const fetchPayments = async () => {
        try {
            // Assuming your backend endpoint can filter payments by workerId
            const response = await axios.get("http://localhost:5000/payments/getPayments", { 
                params: { workerId } 
            });
            setPayments(response.data);
        } catch (error) {
            console.error("Error fetching payments:", error);
            toast.error("Error fetching payment history.");
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <WorkerNavbar />
            <div className="worker-payment-container">
                <h2 className="title">Payment History</h2>
                {payments.length > 0 ? (
                    <table className="payment-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.id}</td>
                                    <td>{payment.customer}</td>
                                    <td>${payment.amount}</td>
                                    <td>{payment.date}</td>
                                    <td>{payment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No payment history found.</p>
                )}
                <button className="back-button" onClick={handleBack}>
                    Back
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default WorkerSeePaymentBilling;