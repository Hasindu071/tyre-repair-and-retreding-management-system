import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerSidebar from "../components/CustomerSidebar";
import "../styles/MyOrders.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { toast } from "react-toastify";

ChartJS.register(ArcElement, Tooltip, Legend);

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Assume the logged-in customer's ID is stored in localStorage
      const customerId = localStorage.getItem("customerId");
      const endpoint = customerId
        ? `http://localhost:5000/orders/getMyOrders?customerId=${customerId}`
        : "http://localhost:5000/orders/getMyOrders";
      const response = await axios.get(endpoint);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  };

  // Helper to get a CSS class based on order.status
  const getOrderStatusClass = (status) => {
    if (!status) return "";
    return status.toLowerCase().replace(" ", "-");
  };

  // Filter to only orders that are "In Progress"
  const inProgressOrders = orders.filter((order) => order.status === "In Progress");

  // Setup pie chart data for in-progress orders count
  const progressCount = inProgressOrders.length;

  const pieData = {
    labels: ["In Progress"],
    datasets: [
      {
        label: "Orders In Progress",
        data: [progressCount],
        backgroundColor: ["#0072ff"],
        borderColor: ["#0056b3"],
        borderWidth: 1,
      },
    ],
  };

  // Mark an order as complete
  const handleCompleteOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/orders/completeOrder/${orderId}`);
      toast.success("Order completed successfully!");
      fetchOrders();
    } catch (error) {
      console.error("Error completing order:", error);
      toast.error("Failed to complete order");
    }
  };

  return (
    <div>
      <CustomerSidebar />
      <div className="my-orders-container">
        <h2 className="my-orders-title">My Orders (In Progress)</h2>
        <p className="my-orders-subtitle">Track the progress of your orders in progress</p>

        <div className="chart-container">
          <Pie data={pieData} />
        </div>

        <div className="orders-list">
          {inProgressOrders.length > 0 ? (
            inProgressOrders.map((order) => (
              <div key={order.id} className="order-card">
                <p>
                  <strong>Item:</strong> {order.item}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`order-status ${getOrderStatusClass(order.status)}`}>
                    {order.status || "Unknown"}
                  </span>
                </p>
                <p>
                  <strong>Price:</strong> ${order.price}
                </p>
                <p>
  <strong>Progress:</strong>{" "}
  {(order.progress === 0 || order.progress) ? order.progress + "%" : "N/A"}
</p>
                <button className="complete-button" onClick={() => handleCompleteOrder(order.id)}>
                  Complete Order
                </button>
              </div>
            ))
          ) : (
            <p className="no-orders">No orders in progress found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;