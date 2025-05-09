import React, { useState, useEffect } from 'react';
import OwnerSidebar from '../../components/SideNav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/OwnerSeeCompleteOrders.css';
import { useNavigate } from 'react-router-dom';
import { fetchCompletedOrders } from '../../services/ownerServices';

const OwnerSeeCompleteOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCompletedOrders();
  }, []);

  const loadCompletedOrders = async () => {
    try {
      const data = await fetchCompletedOrders();
      setOrders(data);
    } catch (error) {
      toast.error("Error fetching completed orders");
    }
  };

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
                    <td>
                      {task.customerFirstName
                        ? `${task.customerFirstName} ${task.customerLastName}`
                        : "N/A"}
                    </td>
                    <td>{task.order_date || "N/A"}</td>
                    <td>{task.status}</td>
                    <td>
                      {task.workerFirstName
                        ? `${task.workerFirstName} ${task.workerLastName}`
                        : "N/A"}
                    </td>
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