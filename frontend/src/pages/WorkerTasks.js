import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import OwnerSidebar from "../components/SideNav";

const WorkerTask = () => {
  const { workerId } = useParams(); // Grab the order id from the URL
  const navigate = useNavigate();
  const [workerTask, setWorkerTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!workerId) {
      setError("No task id provided.");
      setLoading(false);
      return;
    }
    const fetchWorkerTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders/workersTask/${workerId}`);
        setWorkerTask(response.data);
      } catch (err) {
        console.error("Error fetching worker task:", err);
        setError("Failed to fetch worker task");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkerTask();
  }, [workerId]);

  if (loading) {
    return (
      <div>
        <OwnerSidebar />
        <div className="container mt-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading worker task...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <OwnerSidebar />
        <div className="container mt-5 text-center">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
          <button onClick={() => navigate(-1)} className="btn btn-secondary">Back</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <OwnerSidebar />
      <div className="container mt-4">
        <h2>Worker Task Details</h2>
        <div className="card">
          <div className="card-header">
            Order ID: {workerTask.order_id}
          </div>
          <div className="card-body">
            <h5 className="card-title">Service ID: {workerTask.service_id}</h5>
            <p className="card-text"><strong>Total Amount:</strong> {workerTask.total_amount}</p>
            <p className="card-text"><strong>Order Date:</strong> {workerTask.order_date}</p>
            <p className="card-text"><strong>Progress:</strong> {workerTask.progress}</p>
            <p className="card-text"><strong>Tire Brand:</strong> {workerTask.tireBrand}</p>
            <p className="card-text"><strong>Internal Structure:</strong> {workerTask.internalStructure}</p>
            <p className="card-text"><strong>Received Date:</strong> {workerTask.receiveDate}</p>
            <p className="card-text"><strong>Notes:</strong> {workerTask.notes}</p>
            <p className="card-text">
              <strong>Assigned Worker:</strong> {workerTask.firstName} {workerTask.lastName}
            </p>
            <button onClick={() => navigate(-1)} className="btn btn-secondary">Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerTask;