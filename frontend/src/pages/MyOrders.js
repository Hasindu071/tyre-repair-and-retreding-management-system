import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerSidebar from "../components/CustomerSidebar";
import "../styles/MyOrders.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook

ChartJS.register(ArcElement, Tooltip, Legend);

const MyOrders = () => {
    const { userID } = useAuth(); // Get user details from context
    const userId = userID; // Extract user ID from context
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (userId) {
            fetchOrders(userId);
        }
    }, [userId]);

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

    const getStatusColor = (status) => {
        switch (status) {
            case "Completed":
                return "#2ecc71";
            case "Processing":
                return "#f39c12";
            case "Cancelled":
                return "#e74c3c";
            default:
                return "#3498db";
        }
    };

    return (
        <div className="my-orders-page">
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
                                        backgroundColor: [getStatusColor(order.status), "#E0E0E0"],
                                        borderWidth: 1,
                                    },
                                ],
                            };

                            return (
                                <div 
                                    key={order.id} 
                                    className="order-card"
                                    data-status={order.status}
                                >
                                    <div className="order-header">
                                        <h3>Order #{order.id}</h3>
                                        <span className="order-badge" style={{ backgroundColor: getStatusColor(order.status) }}>
                                            {order.status || "Unknown"}
                                        </span>
                                    </div>
                                    
                                    <div className="order-details">
                                        <p>
                                            <strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
                                        </p>
                                        <p>
                                            <strong>Progress:</strong>{" "}
                                            {order.progress !== null && order.progress !== undefined
                                                ? `${order.progress}%`
                                                : "N/A"}
                                        </p>
                                    </div>

                                    {showProgressChart && (
                                        <div className="progress-chart-container">
                                            <div className="progress-chart">
                                                <Pie data={pieData} />
                                            </div>
                                            <div className="progress-text">
                                                {order.progress}% Complete
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <div className="no-orders-container">
                            <p className="no-orders">No orders found</p>
                            <div className="empty-illustration"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyOrders;