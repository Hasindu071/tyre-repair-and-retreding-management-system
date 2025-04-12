import React, { useState, useEffect } from "react";
import "../styles/SeePayment.css";
import OwnerSidebar from "../components/SideNav";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Utility: Get today's date in YYYY-MM-DD format
const getTodayDate = () => new Date().toISOString().slice(0, 10);

const SeePayment = () => {
  const [payments, setPayments] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [formData, setFormData] = useState({
    assignedWorker: "",
    MonthAttendDates: "",
    amount: "",      // fix amount automatically computed
    bonus: "",
    note: "",
    date: getTodayDate(), // prefilled with today's date
    status: "Pending",
  });
  const [editingPaymentId, setEditingPaymentId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch payments and workers on mount
  useEffect(() => {
    fetchPayments();
    fetchWorkers();
  }, []);

  // When a worker is selected, fetch their attendance.
  useEffect(() => {
    if (formData.assignedWorker) {
      console.log("Fetching attendance for worker:", formData.assignedWorker);
      fetchWorkerAttendance(formData.assignedWorker);
    }
  }, [formData.assignedWorker]);

  const fetchPayments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/payments/getPayments");
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Error fetching payments");
    }
  };

  const fetchWorkers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/orders/getWorkers");
      setWorkers(response.data);
    } catch (error) {
      console.error("Error fetching workers:", error);
      toast.error("Error fetching workers");
    }
  };

  const fetchWorkerAttendance = async (workerId) => {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // 1-indexed
      const res = await axios.get(
        `http://localhost:5000/attendanceMark/workerAttend/${workerId}`,
        { params: { year, month } }
      );
      console.log("Attendance response", res.data);
      const daysAttended = Array.isArray(res.data.attendances)
        ? res.data.attendances.length
        : 0;
      // Calculate fix amount: 1500 per attended day
      const fixAmount = daysAttended * 1500;
      const monthName = now.toLocaleString("default", { month: "long" });
      setFormData(prev => ({
        ...prev,
        MonthAttendDates: `${monthName} ${year} (${daysAttended} Days)`,
        amount: fixAmount
      }));
    } catch (error) {
      console.error("Error fetching worker attendance:", error);
      toast.error("Error fetching worker attendance");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If worker selection changes, reset MonthAttendDates and amount so they get re-fetched.
    if (name === "assignedWorker") {
      setFormData({ ...formData, [name]: value, MonthAttendDates: "", amount: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEdit = (payment) => {
    setEditingPaymentId(payment.id);
    setFormData({
      assignedWorker: payment.assignedWorker || "",
      MonthAttendDates: payment.MonthAttendDates || "",
      amount: payment.amount,
      bonus: payment.bonus || "",
      note: payment.note || "",
      date: payment.date || getTodayDate(),
      status: payment.status,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    // Reset formData, prefill date with today's date
    setEditingPaymentId(null);
    setFormData({
      assignedWorker: "",
      MonthAttendDates: "",
      amount: "",
      bonus: "",
      note: "",
      date: getTodayDate(),
      status: "Pending",
    });
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingPaymentId(null);
    setFormData({
      assignedWorker: "",
      MonthAttendDates: "",
      amount: "",
      bonus: "",
      note: "",
      date: getTodayDate(),
      status: "Pending",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.MonthAttendDates ||
      !formData.amount ||
      !formData.bonus ||
      !formData.note ||
      !formData.date
    ) {
      toast.error("Please fill in all fields!");
      return;
    }
    try {
      if (editingPaymentId) {
        await axios.put(
          `http://localhost:5000/payments/updatePayment/${editingPaymentId}`,
          formData
        );
        toast.success("Payment updated successfully");
      } else {
        await axios.post("http://localhost:5000/payments/addPayment", formData);
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
      {/*<Navbar />*/}
      <OwnerSidebar />
      <div className="see-owner-payment-container">
        <h2 className="title">Payment Records</h2>
        {/* Payment Table */}
        <div className="table-wrapper">
          <table className="payment-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Month Attendance Dates</th>
                <th>Amount ($)</th>
                <th>Bonus ($)</th>
                <th>Note</th>
                <th>Date</th>
                <th>Status</th>
                <th>Worker</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.MonthAttendDates}</td>
                  <td>${payment.amount}</td>
                  <td>${payment.bonus}</td>
                  <td>{payment.note}</td>
                  <td>{payment.date}</td>
                  <td className={payment.status === "Paid" ? "paid" : "pending"}>
                    {payment.status}
                  </td>
                  <td>{payment.assignedWorker || "N/A"}</td>
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
        <button className="add-payment-btn" onClick={handleAdd}>
          Add Payment
        </button>
      </div>

      {/* Modal for Adding/Updating Payment */}
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
                  <select
                    name="assignedWorker"
                    value={formData.assignedWorker}
                    onChange={handleChange}
                    className="form-select mb-2"
                  >
                    <option value="">Select Worker</option>
                    {workers.map((worker) => (
                      <option key={worker.id} value={worker.id}>
                        {worker.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="MonthAttendDates"
                    placeholder="Month Attendance Dates"
                    value={formData.MonthAttendDates}
                    onChange={handleChange}
                    required
                    className="form-control mb-2"
                    readOnly
                  />
                  {/* Updated input: name changed from "Fix amount" to "amount" */}
                  <input
                    type="number"
                    name="amount"
                    placeholder="Fix Amount ($)"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    className="form-control mb-2"
                  />
                  <input
                      type="number"
                      name="bonus"
                      placeholder="Bonus ($)"
                      value={formData.bonus}
                      onChange={handleChange}
                      required
                      className="form-control mb-2"
                  />
                  {/* New Note Box */}
                  <textarea
                    name="note"
                    placeholder="Enter note here..."
                    value={formData.note}
                    onChange={handleChange}
                    required
                    className="form-control mb-2"
                    rows="3"
                  ></textarea>
                  {/* Date field prefilled with today and read-only */}
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    readOnly
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
                  <button type="button" className="btn btn-secondary" onClick={handleCancel}>
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