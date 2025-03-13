import React, { useState, useEffect } from "react";
import "../styles/SeePayment.css"; // Import CSS file
import NewNavbar from "../components/Navbars/OwnerRegiNavBar"; // Navbar component
import OwnerSidebar from "../components/SideNav";
import axios from 'axios'; // Import axios for HTTP requests
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SeePayment = () => {
  const [payments, setPayments] = useState([]);
  const [formData, setFormData] = useState({
    customer: "",
    amount: "",
    date: "",
    status: "Pending",
  });
  const [editingPaymentId, setEditingPaymentId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/payments/getPayments');
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Error fetching payments");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (payment) => {
    setEditingPaymentId(payment.id);
    setFormData({
      customer: payment.customer,
      amount: payment.amount,
      date: payment.date,
      status: payment.status,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingPaymentId(null);
    setFormData({ customer: "", amount: "", date: "", status: "Pending" });
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingPaymentId(null);
    setFormData({ customer: "", amount: "", date: "", status: "Pending" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customer || !formData.amount || !formData.date) {
      toast.error("Please fill in all fields!");
      return;
    }
    try {
      if (editingPaymentId) {
        // Update existing payment record
        await axios.put(`http://localhost:5000/payments/updatePayment/${editingPaymentId}`, formData);
        toast.success("Payment updated successfully");
      } else {
        // Create new payment record
        await axios.post('http://localhost:5000/payments/addPayment', formData);
        toast.success("Payment added successfully");
      }
      fetchPayments();
      handleCancel();
    } catch (error) {
      console.error("Error submitting payment:", error);
      toast.error("Error submitting payment");
    }
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
                <th>Actions</th>
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
                  <td>
                    <button onClick={() => handleEdit(payment)} className="edit-btn">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Button to open modal for adding a new payment */}
        <button className="add-payment-btn" onClick={handleAdd}>Add Payment</button>
      </div>

      {/* Bootstrap Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingPaymentId ? "Update Payment" : "Add New Payment"}
                </h5>
                <button type="button" className="btn-close" onClick={handleCancel}></button>
              </div>
              <form onSubmit={handleSubmit} id="paymentForm">
                <div className="modal-body">
                  <input
                    type="text"
                    name="customer"
                    placeholder="Customer Name"
                    value={formData.customer}
                    onChange={handleChange}
                    required
                    className="form-control mb-2"
                  />
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount ($)"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    className="form-control mb-2"
                  />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="form-control mb-2"
                  />
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select mb-2"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingPaymentId ? "Update Payment" : "Save Payment"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default SeePayment;