import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OwnerSidebar from '../../components/SideNav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/OwnerSeeCompleteOrders.css';
import { useNavigate } from 'react-router-dom';

const OwnerSeeCompleteOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

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

  // If total amount equals 0, prompt to add the total amount



  return (
    <div className="owner-complete-orders-page">
      <OwnerSidebar />
      <div className="owner-complete-orders-container">
        <h1 className="title">Complete Orders</h1>
        <div className="table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Service ID</th>
                <th>Customer</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Worker</th>
                <th>Total Amount</th>
                <th>Actions</th>
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
                    <td>{task.TotalAmount}</td>
                    <td>
                    {Number(task.TotalAmount) === 0 ? (
                      <span 
                        className="action-label zero-amount"
                        onClick={() => navigate('/Owner/SeeCustomerPayment')}
                        style={{ cursor: 'pointer' }}
                      >
                        Add Payment
                      </span>
                    ) : (
                      <span className="action-label nonzero-amount">
                        Complete Full Order
                      </span>
                    )}
                  </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No completed orders found.</td>
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