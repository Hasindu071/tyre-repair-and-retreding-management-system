import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Navbar from '../components/Navbars/OwnerRegiNavBar';
import OwnerSidebar from "../components/SideNav";
import "../styles/AssignWorker.css";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { fetchWorkers, fetchApprovedOrders, addOrder, assignWorker } from "../services/ownerServices";

const AssignWorker = () => {
  const [orders, setOrders] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [newOrder, setNewOrder] = useState({ customer: "", task: "" });
  const [selectedWorker, setSelectedWorker] = useState({});
  const { userID } = useAuth();

  // New state for approved orders
  const [approvedOrders, setApprovedOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    //fetchOrders();
    fetchWorkersData();
    fetchApprovedOrdersData();
  }, []);

  const fetchWorkersData = async () => {
    try {
      const data = await fetchWorkers();
      setWorkers(data);
    } catch (error) {
      toast.error("Error fetching workers");
    }
  };

  const fetchApprovedOrdersData = async () => {
    try {
      const data = await fetchApprovedOrders();
      console.log("Approved Repairs:", data);
      setApprovedOrders(data);
    } catch (error) {
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
    setNewOrder({ customer: serviceId, task: "", userID });
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    try {
      const orderToSend = { ...newOrder, userID }; // attach userID before sending
      const data = await addOrder(orderToSend);
      setOrders([...orders, data]);
      setNewOrder({ customer: "", task: "", assignedWorker: "" });
      toast.success("Order added successfully");
    } catch (error) {
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
      await assignWorker(orderId, worker);
      toast.success("Worker assigned successfully");
    } catch (error) {
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


//Note- assign karama passe page eka refresh karanna one.