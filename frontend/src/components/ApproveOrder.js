import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './NavBar'; // Import the Navbar component
import "../styles/ApproveOrder.css"; // Import the CSS file

const ApproveOrder = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: "John Doe",
      address: "456 Elm Street, Los Angeles, CA 90001, USA",
      date: "06 / 01 / 2024",
      status: "Pending",
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      address: "789 Pine Street, New York, NY 10001, USA",
      date: "07 / 02 / 2024",
      status: "Pending",
    },
    {
      id: "ORD003",
      customer: "Michael Brown",
      address: "321 Oak Street, Chicago, IL 60601, USA",
      date: "08 / 03 / 2024",
      status: "Pending",
    },
    {
      id: "ORD004",
      customer: "Emily Johnson",
      address: "159 Maple Avenue, Miami, FL 33101, USA",
      date: "09 / 04 / 2024",
      status: "Pending",
    },
  ]);

  const handleApproval = (id, status) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div>
    <Navbar />
    <div className="approve-order-container">
      <h2 className="title">Approve Orders</h2>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Address</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.address}</td>
              <td>{order.date}</td>
              <td>
                {order.status === "Pending" ? (
                  <>
                    <button
                      className="approve-button"
                      onClick={() => handleApproval(order.id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => handleApproval(order.id, "Canceled")}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <span className={`status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ApproveOrder;
