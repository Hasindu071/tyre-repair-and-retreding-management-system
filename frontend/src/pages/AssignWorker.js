import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavBar'; // Import the Navbar component
import "../styles/AssignWorker.css"; // Import the CSS file

const AssignWorker = () => {
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customer: "John Doe",
      task: "Tire Retreading",
      assignedWorker: "",
    },
    {
      id: "ORD002",
      customer: "Jane Smith",
      task: "Puncture Repair",
      assignedWorker: "",
    },
    {
      id: "ORD003",
      customer: "Michael Brown",
      task: "Wheel Alignment",
      assignedWorker: "",
    },
    {
      id: "ORD004",
      customer: "Emily Johnson",
      task: "Balancing",
      assignedWorker: "",
    },
  ]);

  const [workers] = useState([
    "Worker 1",
    "Worker 2",
    "Worker 3",
    "Worker 4",
  ]);

  const handleAssign = (orderId, worker) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, assignedWorker: worker } : order
    );
    setOrders(updatedOrders);
  };

  return (
    <div>
        <Navbar/>
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
                    {workers.map((worker, index) => (
                      <option key={index} value={worker}>
                        {worker}
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
