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

  // If total amount equals 0, prompt to add the total amount
  const handleAddTotalAmount = async (orderId) => {
    const amount = prompt("Enter total amount:");
    if (!amount || isNaN(amount)) {
      toast.error("Invalid amount");
      return;
    }
    try {
      // Adjust endpoint as necessary to update total_amount in the services table
      await axios.put(`http://localhost:5000/orders/updateTotalAmount/${orderId}`, { totalAmount: amount });
      toast.success("Total amount updated!");
      fetchCompletedOrders();
    } catch (error) {
      console.error("Error updating total amount:", error);
      toast.error("Failed to update total amount");
    }
  };

  // When total amount is not 0, complete the order
  const handleCompleteOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/orders/completeOrder/${orderId}`);
      toast.success("Order completed successfully");
      fetchCompletedOrders();
    } catch (error) {
      console.error("Error completing order:", error);
      toast.error("Error completing order");
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
                          onClick={() => handleAddTotalAmount(task.order_id)}
                        >
                          Add Total Amount
                        </span>
                      ) : (
                        <span 
                          className="action-label nonzero-amount" 
                          onClick={() => handleCompleteOrder(task.order_id)}
                        >
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