import React, { useState } from "react";
import "../styles/SeePayment.css"; // Import CSS file
import NewNavbar from "../components/Navbars/OwnerRegiNavBar"; // Navbar component
import OwnerSidebar from "../components/SideNav";

const SeePayment = () => {
  const [payments, setPayments] = useState([
    { id: 1, customer: "John Doe", amount: 250, date: "2025-02-08", status: "Paid" },
    { id: 2, customer: "Jane Smith", amount: 180, date: "2025-02-07", status: "Pending" },
  ]);

  const [formData, setFormData] = useState({
    customer: "",
    amount: "",
    date: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.customer || !formData.amount || !formData.date) {
      alert("Please fill in all fields!");
      return;
    }
    const newPayment = {
      id: payments.length + 1,
      ...formData,
    };
    setPayments([...payments, newPayment]);
    setFormData({ customer: "", amount: "", date: "", status: "Pending" });
  };

  return (
    <div>
      <NewNavbar />
      <OwnerSidebar />
      <div className="see-owner-payment-container">
        <h2 className="title">Payment Records</h2>

        {/* Payment Table */}
        <div className="table-wrapper">
          <table className="payment-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Amount ($)</th>
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
                  <td className={payment.status === "Paid" ? "paid" : "pending"}>
                    {payment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Payment Form */}
        <div className="add-payment-section">
          <h3>Add New Payment</h3>
          <form onSubmit={handleSubmit} className="payment-form">
            <input
              type="text"
              name="customer"
              placeholder="Customer Name"
              value={formData.customer}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount ($)"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>
            <button type="submit" className="submit-btn">Save Payment</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SeePayment;
