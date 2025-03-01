import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbars/OwnerRegiNavBar';
import OwnerSidebar from "../components/SideNav";
import "../styles/AssignWorker.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignWorker = () => {
  const [orders, setOrders] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [newOrder, setNewOrder] = useState({ customer: "", task: "" });
  const [selectedWorker, setSelectedWorker] = useState({});
  const navigate = useNavigate();

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

  const handleAssign = async (orderId) => {
    const worker = selectedWorker[orderId];
    if (!worker) {
      alert("Please select a worker");
      return;
    }

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

  const handleAddOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/orders/addOrder', newOrder);
      setOrders([...orders, response.data]);
      setNewOrder({ customer: "", task: "" });
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  const handleViewWorkerTasks = (workerName) => {
    navigate(`/workerTasks`);
  };

  return (
    <div>
      <Navbar />
      <OwnerSidebar />
      <div className="assign-worker-container">
        <h2 className="title">Assign Workers</h2>

        <form onSubmit={handleAddOrder} className="add-order-form">
          <input
            type="text"
            placeholder="Customer Name"
            value={newOrder.customer}
            onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Task"
            value={newOrder.task}
            onChange={(e) => setNewOrder({ ...newOrder, task: e.target.value })}
            required
          />
          <button type="submit">Add Order</button>
        </form>

        <table className="worker-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Task</th>
              <th>Assign Worker</th>
              <th>View Worker Tasks</th>
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
                    <>
                      <select
                        className="worker-select"
                        onChange={(e) => setSelectedWorker({ ...selectedWorker, [order.id]: e.target.value })}
                      >
                        <option value="">Select Worker</option>
                        {workers.map((worker) => (
                          <option key={worker.id} value={worker.name}>
                            {worker.name}
                          </option>
                        ))}
                      </select>
                      <button onClick={() => handleAssign(order.id)}>Assign</button>
                      <button onClick={() => handleViewWorkerTasks(selectedWorker[order.id])}>View Tasks</button>
                    </>
                  )}
                </td>
                <td>
                  {order.assignedWorker && (
                    <button onClick={() => handleViewWorkerTasks(order.assignedWorker)}>View Worker Tasks</button>
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