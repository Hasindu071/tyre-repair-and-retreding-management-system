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
                <th>Order Date</th>
                <th>Status</th>
                <th>Total Amount</th>
                <th>Worker</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.order_id || order.id}>
                    <td>{order.service_id}</td>
                    <td>{order.order_date}</td>
                    <td>{order.status}</td>
                    <td>${order.total_amount}</td>
                    <td>
                      {order.firstName ? `${order.firstName} ${order.lastName}` : "No worker assigned"}
                    </td>
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