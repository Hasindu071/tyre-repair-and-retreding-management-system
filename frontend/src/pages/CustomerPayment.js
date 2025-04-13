import React, { useState, useEffect } from "react";
import OwnerSidebar from "../components/SideNav"; // Your sidebar component
import "../styles/CustomerPayment.css"; // Custom CSS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerPayment = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    amount: "",
    paymentDate: new Date().toISOString().split("T")[0], // initialize with today's date
    paymentMethod: "Credit Card",
  });

  const [payments, setPayments] = useState([]);
  const [incompleteOrders, setIncompleteOrders] = useState([]);

  // Fetch all data on load
  useEffect(() => {
    fetchPayments();
    fetchIncompleteOrders();
  }, []);

  // Fetch orders with total amount = 0
  const fetchIncompleteOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/orders/getCompletedTasks");
      const data = await response.json();
      setIncompleteOrders(data);
    } catch (error) {
      console.error("Error fetching incomplete orders:", error);
      toast.error("Error fetching incomplete orders.");
    }
  };

  // Fetch submitted payments
  const fetchPayments = async () => {
    try {
      const response = await fetch("http://localhost:5000/CustomerPayment/getPayments");
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payment records:", error);
      toast.error("Error fetching payment records.");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle auto-filling from an incomplete order (total amount = 0)
  const handleAutoFill = (order) => {
    setFormData({
      customerName: order.customerFirstName ? `${order.customerFirstName} ${order.customerLastName}` : "",
      amount: order.TotalAmount, // this will be 0 initially but can be updated by owner
      paymentDate: new Date().toISOString().split("T")[0],
      paymentMethod: "Credit Card",
    });
  };

  // Handle form submit for customer payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/CustomerPayment/savePayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Payment record submitted successfully.");
        setFormData({
          customerName: "",
          amount: "",
          paymentDate: "",
          paymentMethod: "Credit Card",
        });
        fetchPayments();
        fetchIncompleteOrders(); // Refresh pending orders in case payment is now updated
      } else {
        toast.error("Error submitting payment record.");
      }
    } catch (error) {
      console.error("Error submitting payment record:", error);
      toast.error("Error submitting payment record.");
    }
  };

  return (
    <React.Fragment>
      <OwnerSidebar />
      <div className="customer-payment-container">
        <h2 className="title">Pending Payments (Total = 0)</h2>
        <table className="payment-table">
          <thead>
              <tr>
                <th>Service ID</th>
                <th>Customer</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Worker</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
          </thead>
          <tbody>
              {incompleteOrders.length > 0 ? (
                incompleteOrders.map((task) => (
                  <tr key={task.id}>
                    <td>{task.order_id}</td>
                    <td>{task.customerFirstName ? `${task.customerFirstName} ${task.customerLastName}` : "N/A"}</td>
                    <td>{task.order_date || "N/A"}</td>
                    <td>{task.status}</td>
                    <td>{task.workerFirstName ? `${task.workerFirstName} ${task.workerLastName}` : "N/A"}</td>
                    <td>{task.TotalAmount}</td>
                    <td>
                      <button
                        onClick={() => handleAutoFill(task)}
                        className="eye-btn"
                        title="View and Pay"
                      >
                        👁
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No pending payments found.</td>
                </tr>
              )}
            </tbody>
        </table>

        <br />
        <h2 className="title">Submit Customer Payment</h2>
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentDate">Payment Date</label>
            <input
              type="date"
              id="paymentDate"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">Submit Payment</button>
        </form>

        <br />
        <br />
        <h2 className="title">All Payment Records</h2>
        <table className="payment-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.customer_name}</td>
                <td>{payment.amount}</td>
                <td>{payment.payment_date}</td>
                <td>{payment.payment_method}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </React.Fragment>
  );
};

export default CustomerPayment;