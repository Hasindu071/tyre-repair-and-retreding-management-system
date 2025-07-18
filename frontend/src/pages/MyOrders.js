import React, { useState, useEffect } from "react";
import CustomerSidebar from "../components/CustomerSidebar";
import "../styles/MyOrders.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { getCustomerOrderStatus, getCustomerPendingRejectedOrderstatus } from "../services/productServices";
import { FaTrashAlt } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

const MyOrders = () => {
    const { userID } = useAuth();
    const userId = userID; // Extract user ID from context
    const [orders, setOrders] = useState([]);
    const [pendingRejectedOrders, setPendingRejectedOrders] = useState([]);
    const [hideCompleted, setHideCompleted] = useState(
        JSON.parse(localStorage.getItem("hideCompleted")) || false
    );

    useEffect(() => {
        if (userId) {
            fetchOrders(userId);
            fetchPendingRejectedOrders(userId);
        }
    }, [userId]);

    useEffect(() => {
        localStorage.setItem("hideCompleted", JSON.stringify(hideCompleted));
    }, [hideCompleted]);

    const fetchOrders = async (customerId) => {
        try {
            const data = await getCustomerOrderStatus(customerId);
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Error fetching orders");
        }
    };

    const fetchPendingRejectedOrders = async (customerId) => {
        try {
            const data = await getCustomerPendingRejectedOrderstatus(customerId);
            setPendingRejectedOrders(data);
        } catch (error) {
            console.error("Error fetching pending/rejected orders:", error);
            toast.error("Error fetching pending/rejected orders");
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
            case "Pending":
                return "#3498db";
            case "Rejected":
                return "#e74c3c";
            default:
                return "#f39c12";
        }
    };

    const filteredOrders = hideCompleted
        ? orders.filter((order) => order.status !== "Completed")
        : orders;

    return (
        <div className="my-orders-page">
            <CustomerSidebar />
            <div className="my-orders-container">
                <h2 className="my-orders-title">My Order Statuses</h2>
                <button
                    className="hide-completed-btn"
                    onClick={() => setHideCompleted(!hideCompleted)}
                >
                    <FaTrashAlt /> {hideCompleted ? "Show Completed Orders" : "Hide Completed Orders"}
                </button>
                <div className="orders-list">
                    {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => {
                            const showProgressChart = order.progress > 0 && order.progress < 100;
                            const pieData = {
                                labels: ["Progress", "Remaining"],
                                datasets: [
                                    {
                                        data: [order.progress, 100 - order.progress],
                                        backgroundColor: [
                                            getStatusColor(order.status),
                                            "#E0E0E0"
                                        ],
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
                                        <h3>Order :{order.service_id}</h3>
                                        <span
                                            className="order-badge"
                                            style={{
                                                backgroundColor: getStatusColor(order.status),
                                            }}
                                        >
                                            {order.status || "Unknown"}
                                        </span>
                                    </div>
                                    <div className="order-details">
                                        <p>
                                            <strong>Date:</strong>{" "}
                                            {new Date(order.order_date).toLocaleDateString()}
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
                <div className="pending-rejected-orders">
                    <h2 className="my-orders-title">Pending & Rejected Orders</h2>
                    <div className="orders-list">
                        {pendingRejectedOrders.length > 0 ? (
                            pendingRejectedOrders.map((order1) => (
                                <div
                                    key={order1.id}
                                    className={`order-card ${order1.status === "Rejected" ? "rejected-card" : ""}`}
                                    data-status={order1.status}
                                >
                                    <div className="order-header">
                                        <h3>Order :{order1.service_id}</h3>
                                        <span
                                            className="order-badge"
                                            style={{ backgroundColor: getStatusColor(order1.status) }}
                                        >
                                            {order1.status || "Unknown"}
                                        </span>
                                    </div>
                                    <div className="order-details">
                                        <p>
                                            <strong>Date:</strong>{" "}
                                            {new Date(order1.receiveDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    {order1.status === "Rejected" && (
                                        <div className="reject-order-details">
                                            <p>
                                                <strong>Reason for Rejection:</strong>{" "}
                                                {order1.note || "N/A"}
                                            </p>
                                            <h10><em>more infor: 071-7517940</em></h10>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="no-orders-container">
                                <p className="no-orders">No pending or rejected orders found</p>
                                <div className="empty-illustration"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrders;