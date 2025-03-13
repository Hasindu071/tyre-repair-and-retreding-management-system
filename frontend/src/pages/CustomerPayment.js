import React, { useState, useEffect } from "react";
import OwnerNavbar from "../components/Navbars/OwnerRegiNavBar"; // Import the Navbar component
import OwnerSidebar from "../components/SideNav"; // Import the Sidebar component
import "../styles/CustomerPayment.css"; // Import CSS file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerPayment = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    amount: "",
    paymentDate: "",
    paymentMethod: "Credit Card",
  });

  const [payments, setPayments] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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
        // Reset form
        setFormData({
          customerName: "",
          amount: "",
          paymentDate: "",
          paymentMethod: "Credit Card",
        });
        // Fetch updated payment records
        fetchPayments();
      } else {
        toast.error("Error submitting payment record.");
        console.error("Error submitting payment record");
      }
    } catch (error) {
      console.error("Error submitting payment record:", error);
      toast.error("Error submitting payment record.");
    }
  };

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

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <>
      <OwnerNavbar />
      <OwnerSidebar />
      <div className="customer-payment-container">
        <h2 className="title">Customer Payment</h2>
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
        <h2 className="title">Payment Records</h2>
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
      </div>
      <ToastContainer />
    </>
  );
};

export default CustomerPayment;