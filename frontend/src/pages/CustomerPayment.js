import React, { useState, useEffect, useRef } from "react";
import OwnerSidebar from "../components/SideNav";
import "../styles/CustomerPayment.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getIncompleteOrders, getcustomerPayments, savePayment } from "../services/PaymentService";

const CustomerPayment = () => {
  const [formData, setFormData] = useState({
    amount: "",
    note: "",
    serviceamount: "",
    deliveryamount: "",
    customerId: "",
    paymentDate: new Date().toISOString().split("T")[0],
    paymentMethod: "Credit Card",
    orderId: "",
    needDeliveryService: ""
  });

  const [payments, setPayments] = useState([]);
  const [incompleteOrders, setIncompleteOrders] = useState([]);

  // Create a ref for the form
  const formRef = useRef(null);

  useEffect(() => {
    fetchPayments();
    fetchIncompleteOrders();
  }, []);

  const fetchIncompleteOrders = async () => {
    try {
      const data = await getIncompleteOrders();
      setIncompleteOrders(data);
    } catch (error) {
      toast.error("Error fetching incomplete orders.");
    }
  };

  const fetchPayments = async () => {
    try {
      const data = await getcustomerPayments();
      setPayments(data);
    } catch (error) {
      toast.error("Error fetching payment records.");
    }
  };

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

  const handleAutoFill = (order) => {
    setFormData({
      amount: order.TotalAmount,
      serviceamount: order.total_amount,
      customerId: order.customer_ID,
      paymentDate: new Date().toISOString().split("T")[0],
      paymentMethod: "Credit Card",
      orderId: order.order_id,
      needDeliveryService: order.needDeliveryService || "No"
    });

    // Scroll to the form section
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate form data
  const requiredFields = [
    "amount",
    "note",
    "serviceamount",
    "deliveryamount",
    "customerId",
    "paymentDate",
    "paymentMethod",
    "orderId",
    "needDeliveryService"
  ];

  for (const field of requiredFields) {
    if (!formData[field]) {
      toast.error(`The field "${field}" is required.`);
      return;
    }
  }

  console.log("Submitting payment data:", formData); // Debugging: Log the payload

  try {
    const data = await savePayment(formData);
    if (data.success) {
      toast.success("Payment record submitted successfully.");
      setFormData({
        amount: "",
        note: "",
        serviceamount: "",
        deliveryamount: "",
        customerId: "",
        paymentDate: new Date().toISOString().split("T")[0],
        paymentMethod: "Credit Card",
        orderId: "",
        needDeliveryService: ""
      });
      fetchPayments();
      fetchIncompleteOrders();
    } else {
      toast.error(data.message || "Error submitting payment record.");
    }
  } catch (error) {
    console.error("Error submitting payment record:", error); // Debugging: Log the error
    if (error.response) {
      console.error("Server response:", error.response.data); // Log server error details
    }
    toast.error("Error submitting payment record.");
  }
};

  return (
    <React.Fragment>
      <OwnerSidebar />
      <div className="customer-payment-container">
        <h2 className="title-payment-Rs">Pending Payments</h2>
        <div className="table-scroll">
          <table className="payment-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Service Amount</th>
                <th>Customer ID</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Delivery</th>
                <th>Worker</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {incompleteOrders.length > 0 ? (
                incompleteOrders.map((task) => (
                  <tr key={task.id}>
                    <td>{task.order_id}</td>
                    <td>{task.total_amount}</td>
                    <td>{task.customer_ID}</td>
                    <td>{task.order_date ? new Date(task.order_date).toLocaleDateString() : "N/A"}</td>
                    <td>{task.status}</td>
                    <td>{task.needDeliveryService}</td>
                    <td>{task.workerFirstName ? `${task.workerFirstName} ${task.workerLastName}` : "N/A"}</td>
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
                  <td colSpan="9">No pending payments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <br />
        <h2 className="title-payment-Rs">Submit Customer Payment</h2>
        {/* Attach the ref to the form */}
        <form onSubmit={handleSubmit} className="payment-form" ref={formRef}>
          <div className="form-group">
            <label htmlFor="orderID">Order ID</label>
            <input
              type="number"
              id="orderID"
              name="orderID"
              value={formData.orderId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="customerId">Customer ID</label>
            <input
              type="text"
              id="customerId"
              name="customerId"
              value={formData.customerId}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="serviceamount">Service Amount</label>
            <input
              type="number"
              id="serviceamount"
              name="serviceamount"
              value={formData.serviceamount}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Material and Utility Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter material and utility amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="deliveryamount">Delivery Amount</label>
            {formData.needDeliveryService === "Yes" ? (
              <input
                type="number"
                id="deliveryamount"
                name="deliveryamount"
                placeholder="Enter delivery amount"
                value={formData.deliveryamount}
                onChange={handleChange}
              />
            ) : (
              <input
                type="number"
                id="deliveryamount"
                name="deliveryamount"
                value="0"
                readOnly
              />
            )}
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
              <option value="Cash on Hand">Cash on Hand</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div className="notes-box-payment">
            <label htmlFor="notes">Service details(Material and Utility)</label>
            <textarea
              id="notes"
              name="note" 
              placeholder="Enter your notes here..."
              rows="5"
              value={formData.note} 
              onChange={handleChange} 
              required
            ></textarea>
          </div>

          <button type="submit-payment" className="submit-btn-payment">
            Submit Payment
          </button>
        </form>

        <br />
        <br />
        <h2 className="title-payment-Rs">All Payment Records</h2>
        <table className="payment-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Service Amount</th>
              <th>Delivery Amount</th>
              <th>Total Amount</th>
              <th>Payment Date</th>
              <th>Note</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.amount}</td>
                <td>{payment.delivery_fee}</td>
                <td>{payment.net_amount}</td>
                <td>{payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : "N/A"}</td>
                <td>{payment.note}</td>
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