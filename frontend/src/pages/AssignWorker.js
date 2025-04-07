import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Navbar from '../components/Navbars/OwnerRegiNavBar';
import OwnerSidebar from "../components/SideNav";
import "../styles/AssignWorker.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify"; // toast container
import "react-toastify/dist/ReactToastify.css"; // import toast css

const AssignWorker = () => {
  const [orders, setOrders] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [newOrder, setNewOrder] = useState({ customer: "", task: "" });
  const [selectedWorker, setSelectedWorker] = useState({});

  // New state for approved orders
  const [approvedOrders, setApprovedOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
    fetchWorkers();
    fetchApprovedOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders/getOrders');
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  };

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders/getWorkers');
      setWorkers(response.data);
    } catch (error) {
      console.error("Error fetching workers:", error);
      toast.error("Error fetching workers");
    }
  };

  const fetchApprovedOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/services/approvedOrders');
      console.log("Approved Repairs:", response.data); // Debug log
      setApprovedOrders(response.data);
    } catch (error) {
      console.error("Error fetching approved repairs:", error);
      toast.error("Error fetching approved repairs");
    }
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/orders/getOrders', newOrder);
      setOrders([...orders, response.data]);
      setNewOrder({ customer: "", task: "" });
      toast.success("Order added successfully");
    } catch (error) {
      console.error("Error adding order:", error);
      toast.error("Error adding order");
    }
  };

  const handleAssign = async (orderId) => {
    const worker = selectedWorker[orderId];
    if (!worker) {
      toast.error("Please select a worker");
      return;
    }

    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, assignedWorker: worker } : order
    );
    setOrders(updatedOrders);

    try {
      await axios.put(`http://localhost:5000/orders/assignWorker/${orderId}`, { assignedWorker: worker });
      toast.success("Worker assigned successfully");
    } catch (error) {
      console.error("Error assigning worker:", error);
      toast.error("Error assigning worker");
    }
  };

  const handleViewWorkerTasks = (workerName) => {
    // Navigate to a page showing detailed worker tasks
    navigate(`/WorkerProfileImage`);
  };



  return (
    <div>
            {/*<Navbar />*/}
      <OwnerSidebar />
      <div className="assign-worker-container">
        <h2 className="title">Assign Workers</h2>

        {/* New Order Form */}
        <form onSubmit={handleAddOrder} className="add-order-form">
          <label>Order ID</label>
          <input
            type="text"
            placeholder="ID"
            value={newOrder.customer}
            onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
            required
          />
          <label>Service amount</label>
          <input
            type="text"
            placeholder="Service amount"
            value={newOrder.task}
            onChange={(e) => setNewOrder({ ...newOrder, task: e.target.value })}
            required
          />
          <button type="submit">Add Order</button>
        </form>


        {/* Orders Table */}
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
                        onChange={(e) =>
                          setSelectedWorker({
                            ...selectedWorker,
                            [order.id]: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Worker</option>
                        {workers.map((worker) => (
                          <option key={worker.id} value={worker.name}>
                            {worker.name}
                          </option>
                        ))}
                      </select>
                      <button onClick={() => handleAssign(order.id)}>Assign</button>
                      <button onClick={() => handleViewWorkerTasks(selectedWorker[order.id])}>
                        View Tasks
                      </button>
                    </>
                  )}
                </td>
                <td>
                  {order.assignedWorker && (
                    <button onClick={() => handleViewWorkerTasks(order.assignedWorker)}>
                      View Worker Tasks
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

       {/* Display Approved Repair Orders */}
<h3>Approved Orders</h3>
<table className="worker-table">
  <thead>
    <tr>
      <th>Service ID</th>
      <th>Tire Brand</th>
      <th>Notes</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {approvedOrders.map((order) => (
      <tr key={order.service_id}>
        <td>{order.service_id}</td>
        <td>{order.tireBrand}</td>
        <td>{order.notes}</td>
        <td>{order.status}</td>
      </tr>
    ))}
  </tbody>
</table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AssignWorker;