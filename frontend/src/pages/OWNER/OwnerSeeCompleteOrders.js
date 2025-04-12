import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OwnerSidebar from '../../components/SideNav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/OwnerSeeCompleteOrders.css';

const OwnerSeeCompleteOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  const fetchCompletedOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/orders/getCompletedTasks");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching completed orders:", error);
      toast.error("Error fetching completed orders");
    }
  };

  return (
    <div>
      <OwnerSidebar />
      <div className="owner-complete-orders-container">
        <h2 className="title">Complete Orders</h2>
        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Service ID</th>
                <th>Customer</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Worker</th>
              </tr>
            </thead>
            <tbody>
        {orders.length > 0 ? (
          orders.map((task) => (
            <tr key={task.id}>
              <td>{task.order_id}</td>
              <td>{task.customerFirstName ? `${task.customerFirstName} ${task.customerLastName}` : "N/A"}</td>
              <td>{task.order_date || "N/A"}</td>
              <td>{task.status}</td>
              <td>{task.workerFirstName ? `${task.workerFirstName} ${task.workerLastName}` : "N/A"}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No completed orders found.</td>
          </tr>
        )}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OwnerSeeCompleteOrders;