import React, { useState } from "react";
import NewNavbar from "../components/Navbars/CustomerRegiNavBar"; // Assuming you have a Navbar component
import "../styles/MyOrders.css"; // Import the CSS file

const MyOrders = () => {
    // Sample order data (Replace with API data in real implementation)
    const [orders] = useState([
        { id: 1, item: "Retreaded Truck Tire", status: "Pending", price: "$100" },
        { id: 2, item: "Tire Repair Service", status: "In Progress", price: "$50" },
        { id: 3, item: "New Car Tire", status: "Completed", price: "$120" }
    ]);

    return (
        <div>
            <NewNavbar />
            <div className="my-orders-container">
                <h2 className="my-orders-title">My Orders</h2>
                <p className="my-orders-subtitle">Track your past and current orders</p>

                <div className="orders-list">
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <div key={order.id} className="order-card">
                                <p><strong>Item:</strong> {order.item}</p>
                                <p><strong>Status:</strong> <span className={`order-status ${order.status.toLowerCase().replace(" ", "-")}`}>{order.status}</span></p>
                                <p><strong>Price:</strong> {order.price}</p>
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
