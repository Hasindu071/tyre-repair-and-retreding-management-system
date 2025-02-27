import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbars/OwnerRegiNavBar'; // Import the Navbar component
import OwnerSidebar from "../components/SideNav";
import "../styles/AssignWorker.css"; // Import the CSS file
import axios from 'axios'; // Import axios for HTTP requests

const AssignWorker = () => {
  const [orders, setOrders] = useState([]);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchWorkers();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders/getOrders');
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders/getWorkers');
      setWorkers(response.data);
    } catch (error) {
      console.error("Error fetching workers:", error);
    }
  };

  const handleAssign = async (orderId, worker) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, assignedWorker: worker } : order
    );
    setOrders(updatedOrders);

    try {
      await axios.put(`http://localhost:5000/orders/assignWorker/${orderId}`, { assignedWorker: worker });
      alert("Worker assigned successfully");
    } catch (error) {
      console.error("Error assigning worker:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <OwnerSidebar />
      <div className="assign-worker-container">
        <h2 className="title">Assign Workers</h2>
        <table className="worker-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Task</th>
              <th>Assign Worker</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.task}</td>
                <td>
                  {order.assignedWorker ? (
                    <span className="assigned-worker">{order.assignedWorker}</span>
                  ) : (
                    <select
                      className="worker-select"
                      onChange={(e) => handleAssign(order.id, e.target.value)}
                    >
                      <option value="">Select Worker</option>
                      {workers.map((worker) => (
                        <option key={worker.id} value={worker.name}>
                          {worker.name}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignWorker;