import React, { useState, useEffect } from "react";
import OwnerSidebar from "../components/SideNav"; // Your sidebar component
import "../styles/CustomerPayment.css"; // Custom CSS
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerPayment = () => {
  // Initialize formData with today's date and an empty orderId and needDeliveryService field
  const [formData, setFormData] = useState({
    amount: "",
    note: "",
    serviceamount: "",
    deliveryamount: "",
    customerId: "",
    paymentDate: new Date().toISOString().split("T")[0],
    paymentMethod: "Credit Card",
    orderId: "",
    needDeliveryService: ""  // New field added
  });

  const [payments, setPayments] = useState([]);
  const [incompleteOrders, setIncompleteOrders] = useState([]);

  // Fetch the lists on mount
  useEffect(() => {
    fetchPayments();
    fetchIncompleteOrders();
  }, []);

  // Fetch orders with total amount = 0 (pending orders)
  const fetchIncompleteOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/orders/getCompletedTotalAmount0Tasks");
      const data = await response.json();
      setIncompleteOrders(data);
    } catch (error) {
      console.error("Error fetching incomplete orders:", error);
      toast.error("Error fetching incomplete orders.");
    }
  };

  // Fetch submitted payment records
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

  // Handle input change for the payment form
  const handleChange = (e) => {
    const { name, value } = e.target;
    // If needDeliveryService is changed to "No", force deliveryamount to 0.
    if (name === "needDeliveryService" && value === "No") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        deliveryamount: "0"
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Auto-fill the payment form when an incomplete order is selected.
  // It also sets needDeliveryService from the order.
  const handleAutoFill = (order) => {
    setFormData({
      amount: order.TotalAmount, // Typically 0; owner can update this field
      serviceamount: order.total_amount,
      customerId: order.customer_ID,
      paymentDate: new Date().toISOString().split("T")[0],
      paymentMethod: "Credit Card",
      orderId: order.order_id, // Use order_id to update the related service's total_amount
      needDeliveryService: order.needDeliveryService || "No"
    });
  };

  // Submit the payment form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that orderId is present (auto-fill must have been used)
    if (!formData.orderId) {
      toast.error("Please select a pending payment record using the eye button.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/CustomerPayment/savePayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    
      const data = await response.json(); // Get the actual response body
    
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
      console.error("Error submitting payment record:", error);
      toast.error("Error submitting payment record.");
    }
  };

  return (
    <React.Fragment>
      <OwnerSidebar />
      <div className="customer-payment-container">
        <h2 className="title">Pending Payments</h2>
        <div className="table-scroll">
        <table className="payment-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>service Amount</th>
              <th>Customer ID</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Delivery</th>
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
                  <td>{task.total_amount}</td>
                  <td>{task.customer_ID}</td>
                  <td>{task.order_date || "N/A"}</td>
                  <td>{task.status}</td>
                  <td>{task.needDeliveryService}</td>
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
                <td colSpan="9">No pending payments found.</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>

        <br />
        <h2 className="title">Submit Customer Payment</h2>
        <form onSubmit={handleSubmit} className="payment-form">
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
              <label htmlFor="note">Note</label>
              <input
                type="text"
                id="note"
                name="note"
                value={formData.note}
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

          {/* Conditionally render the Delivery Amount input based on needDeliveryService */}
          <div className="form-group">
            <label htmlFor="deliveryamount">Delivery Amount</label>
            {formData.needDeliveryService === "Yes" ? (
              <input
                type="number"
                id="deliveryamount"
                name="deliveryamount"
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
                <option value="Cash on Hand" >Cash on Hand</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
          </div>

          <button type="submit" className="submit-btn">
            Submit Payment
          </button>
        </form>

        <br />
        <br />
        <h2 className="title">All Payment Records</h2>
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
                <td>{payment.payment_date}</td>
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