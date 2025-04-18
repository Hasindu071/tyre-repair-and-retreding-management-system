import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerSidebar from "../components/CustomerSidebar";
import "../styles/MyOrders.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // ✅ Using the correct Auth hook

ChartJS.register(ArcElement, Tooltip, Legend);

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.id) {
      fetchOrders(user.id);
    }
  }, [user]);

  const fetchOrders = async (customerId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/orders/getCustomerOrderStatus?customerId=${customerId}`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  };

  return (
    <div>
      <CustomerSidebar />
      <div className="my-orders-container">
        <h2 className="my-orders-title">My Order Statuses</h2>

        <div className="orders-list">
          {orders.length > 0 ? (
            orders.map((order) => {
              const showProgressChart =
                order.progress > 0 && order.progress < 100;

              const pieData = {
                labels: ["Progress", "Remaining"],
                datasets: [
                  {
                    data: [order.progress, 100 - order.progress],
                    backgroundColor: ["#36A2EB", "#E0E0E0"],
                    borderWidth: 1,
                  },
                ],
              };

              return (
                <div key={order.id} className="order-card">
                  <p>
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status || "Unknown"}
                  </p>
                  <p>
                    <strong>Progress:</strong>{" "}
                    {order.progress !== null && order.progress !== undefined
                      ? `${order.progress}%`
                      : "N/A"}
                  </p>

                  {showProgressChart && (
                    <div className="progress-chart">
                      <Pie data={pieData} />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="no-orders">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
