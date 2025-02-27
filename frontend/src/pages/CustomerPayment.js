import React, { useState } from "react";
import OwnerNavbar from "../components/Navbars/OwnerRegiNavBar"; // Import the Navbar component
import OwnerSidebar from "../components/SideNav"; // Import the Sidebar component
import "../styles/CustomerPayment.css"; // Import CSS file

const CustomerPayment = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    amount: "",
    paymentDate: "",
    paymentMethod: "Credit Card",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save the payment record to the backend or database
    console.log("Payment record submitted:", formData);
    // Reset form
    setFormData({
      customerName: "",
      amount: "",
      paymentDate: "",
      paymentMethod: "Credit Card",
    });
  };

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
      </div>
    </>
  );
};

export default CustomerPayment;