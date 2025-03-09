import React, { useState, useEffect } from "react";
import axios from "axios";
import NewNavbar from "../components/Navbars/CustomerRegiNavBar";
import "../styles/MyOrders.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/orders/getMyOrders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Safe helper: Returns a CSS class based on order.status or empty string if not available.
  const getOrderStatusClass = (status) => {
    if (!status) return "";
    return status.toLowerCase().replace(" ", "-");
  };
 
  // Group orders by status
  const pendingCount = orders.filter((order) => order.status === "Pending").length;
  const progressCount = orders.filter((order) => order.status === "In Progress").length;
  const completedCount = orders.filter((order) => order.status === "Completed").length;

  const pieData = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        label: "Order Status",
        data: [pendingCount, progressCount, completedCount],
        backgroundColor: ["#ffcc00", "#0072ff", "#28a745"],
        borderColor: ["#ffa000", "#0056b3", "#1e7e34"],
        borderWidth: 1,
      },
    ],
  };

  // Mark an order as complete
  const handleCompleteOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/orders/completeOrder/${orderId}`);
      alert("Order completed successfully!");
      fetchOrders();
    } catch (error) {
      console.error("Error completing order:", error);
      alert("Failed to complete order");
    }
  };

  return (
    <div>
      <NewNavbar />
      <div className="my-orders-container">
        <h2 className="my-orders-title">My Orders</h2>
        <p className="my-orders-subtitle">Track your past and current orders</p>

        <div className="chart-container">
          <Pie data={pieData} />
        </div>

        <div className="orders-list">
          {orders.length > 0 ? (
            orders.map((order) => (
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
                {order.status === "In Progress" && (
                  <button className="complete-button" onClick={() => handleCompleteOrder(order.id)}>
                    Complete Order
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="no-orders">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;