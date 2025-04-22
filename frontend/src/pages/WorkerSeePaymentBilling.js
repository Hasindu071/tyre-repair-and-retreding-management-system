import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkerSideBar from "../components/WorkerSideBar";
import "../styles/WorkerSeePaymentBilling.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkerSeePaymentBilling = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workerId, setWorkerId] = useState(null);

  useEffect(() => {
    // Get worker ID from localStorage or wherever it's stored after login
    const storedWorkerId = localStorage.getItem("workerId");
    if (storedWorkerId) {
      setWorkerId(storedWorkerId);
      fetchWorkerPayments(storedWorkerId);
    }
  }, []);

  const fetchWorkerPayments = async (workerId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/payments/getWorkerPayments/${workerId}`
      );
      setPayments(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Error fetching payment details");
      setLoading(false);
    }
  };

  // Calculate total earnings
  const totalEarnings = payments.reduce(
    (sum, payment) => sum + Number(payment.amount) + Number(payment.bonus),
    0
  );

  return (
    <div className="worker-payment-container">
      <WorkerSideBar />
      <div className="worker-payment-content">
        <div className="payment-header">
          <h1>My Payment Details</h1>
          <div className="total-earnings">
            <span>Total Earnings:</span>
            <span className="amount">${totalEarnings.toFixed(2)}</span>
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading payment details...</p>
          </div>
        ) : payments.length === 0 ? (
          <div className="no-payments">
            <img src="/images/no-payments.svg" alt="No payments" />
            <p>No payment records found</p>
          </div>
        ) : (
          <div className="payment-cards-container">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className={`payment-card ${payment.status.toLowerCase()}`}
              >
                <div className="payment-card-header">
                  <h3>{payment.MonthAttendDates}</h3>
                  <span className={`status-badge ${payment.status.toLowerCase()}`}>
                    {payment.status}
                  </span>
                </div>
                <div className="payment-card-body">
                  <div className="payment-row">
                    <span>Base Salary:</span>
                    <span>${payment.amount}</span>
                  </div>
                  <div className="payment-row">
                    <span>Bonus:</span>
                    <span>${payment.bonus}</span>
                  </div>
                  <div className="payment-row total">
                    <span>Total:</span>
                    <span>${(Number(payment.amount) + Number(payment.bonus)).toFixed(2)}</span>
                  </div>
                  {payment.note && (
                    <div className="payment-notes">
                      <p>
                        <strong>Notes:</strong> {payment.note}
                      </p>
                    </div>
                  )}
                </div>
                <div className="payment-card-footer">
                  <span>Paid on: {payment.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default WorkerSeePaymentBilling;