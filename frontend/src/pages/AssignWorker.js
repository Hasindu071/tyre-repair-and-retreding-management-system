import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Navbar from '../components/Navbars/OwnerRegiNavBar';
import OwnerSidebar from "../components/SideNav";
import "../styles/AssignWorker.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify"; // toast container
import "react-toastify/dist/ReactToastify.css"; // import toast css
import { FaEye } from "react-icons/fa";


const AssignWorker = () => {
  const [orders, setOrders] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [newOrder, setNewOrder] = useState({ customer: "", task: "" });
  const [selectedWorker, setSelectedWorker] = useState({});

  // New state for approved orders
  const [approvedOrders, setApprovedOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    //fetchOrders();
    fetchWorkers();
    fetchApprovedOrders();
  }, []);

  /*
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders/getOrders');
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  };*/

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

  // Function to handle viewing service details
  const handleViewService = (serviceId) => {
    let type = "";
  
    if (serviceId.startsWith("RD")) {
      type = "Retreading";
    } else if (serviceId.startsWith("RP")) {
      type = "Repair";
    }
  
    setNewOrder({ customer: serviceId, task: "" });
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
              <form onSubmit={handleAddOrder} className="add-order-form row">
        {/* Left Column */}
        <div className="col-md-6">
          <div className="form-group mb-3">
            <label>Order ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="ID"
              value={newOrder.customer}
              onChange={(e) =>
                setNewOrder({ ...newOrder, customer: e.target.value })
              }
              readOnly={
                newOrder.customer.startsWith("RD") ||
                newOrder.customer.startsWith("RP")
              }
            />
          </div>

          <div className="form-group mb-3">
            <label>Service Amount</label>
            <input
              type="text"
              className="form-control"
              placeholder="Service amount"
              value={newOrder.task}
              onChange={(e) => setNewOrder({ ...newOrder, task: e.target.value })}
              required
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-6 d-flex flex-column justify-content-start">
          <div className="form-group mb-3">
            <label>Assign Worker</label>
            <select
            className="form-select"
            value={newOrder.assignedWorker || ""}
            onChange={(e) =>
              setNewOrder({ ...newOrder, assignedWorker: e.target.value })
            }
            required
          >
            <option value="">Select Worker</option>
            {workers.map((worker) => (
              <option key={worker.id} value={worker.id}>
                {worker.id} - {worker.name}
              </option>
            ))}
          </select>

          </div>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={() => handleViewWorkerTasks(newOrder.assignedWorker)}
            >
              View Tasks
            </button>
            <button type="submit" className="btn btn-primary">
              Add Order
            </button>
          </div>
        </div>
      </form>

       {/* Display Approved Repair Orders */}
       <h3>Approved Orders</h3>
<table className="worker-table">
  <thead>
    <tr>
      <th>Service ID</th>
      <th>Type</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {approvedOrders.map((order) => {
      const type =
        order.service_id.startsWith("RD")
          ? "Retreading"
          : order.service_id.startsWith("RP")
          ? "Repair"
          : "Unknown";
      return (
        <tr key={order.service_id}>
          <td>{order.service_id}</td>
          <td>{type}</td>
          <td>
            <button onClick={() => handleViewService(order.service_id)}>
              <FaEye />
            </button>
          </td>
        </tr>
      );
    })}
  </tbody>
</table>

      </div>
      <ToastContainer />
    </div>
  );
};

export default AssignWorker;