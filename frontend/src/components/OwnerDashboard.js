import React, { useState } from "react";
import Navbar from "./NavBar"; // Assuming you have a Navbar component
import "../styles/OwnerDashboard.css"; // Import the CSS file

const OwnerDashboard = () => {
    const [orders, setOrders] = useState([
        { id: 1, customer: "John Doe", status: "Pending" },
        { id: 2, customer: "Jane Smith", status: "Pending" }
    ]);

    const [workers, setWorkers] = useState([
        { id: 1, name: "Mike Johnson", status: "Pending" },
        { id: 2, name: "Sarah Lee", status: "Pending" }
    ]);

    const approveOrder = (id) => {
        setOrders(orders.map(order => 
            order.id === id ? { ...order, status: "Approved" } : order
        ));
    };

    const approveWorker = (id) => {
        setWorkers(workers.map(worker => 
            worker.id === id ? { ...worker, status: "Approved" } : worker
        ));
    };

    return (
        <div>
            <Navbar />
            <div className="owner-dashboard-container">
                <h2 className="owner-dashboard-title">Owner Dashboard</h2>
                <p className="owner-dashboard-subtitle">Manage operations efficiently</p>

                <div className="owner-dashboard-grid">
                    {/* Approve Customer Orders */}
                    <div className="dashboard-section">
                        <h3>Approve Customer Orders</h3>
                        {orders.map(order => (
                            <div key={order.id} className="dashboard-item">
                                <p>Customer: {order.customer}</p>
                                <p>Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
                                {order.status === "Pending" && (
                                    <button className="dashboard-button" onClick={() => approveOrder(order.id)}>Approve</button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Assign Workers */}
                    <div className="dashboard-section">
                        <h3>Assign Workers</h3>
                        <p>Feature Coming Soon...</p>
                    </div>

                    {/* Approve New Workers */}
                    <div className="dashboard-section">
                        <h3>Approve New Workers</h3>
                        {workers.map(worker => (
                            <div key={worker.id} className="dashboard-item">
                                <p>Name: {worker.name}</p>
                                <p>Status: <span className={`status ${worker.status.toLowerCase()}`}>{worker.status}</span></p>
                                {worker.status === "Pending" && (
                                    <button className="dashboard-button" onClick={() => approveWorker(worker.id)}>Approve</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboard;
