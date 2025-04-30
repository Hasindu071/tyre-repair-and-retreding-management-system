import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import OwnerSidebar from "../components/SideNav";

const WorkerTask = () => {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const [workerTasks, setWorkerTasks] = useState([]); // changed to array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!workerId) {
      setError("No worker ID provided.");
      setLoading(false);
      return;
    }

    const fetchWorkerTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders/workersTask/${workerId}`);
        const tasks = Array.isArray(response.data) ? response.data : [response.data]; // make sure it's an array
        setWorkerTasks(tasks);
      } catch (err) {
        console.error("Error fetching worker tasks:", err);
        setError("Failed to fetch worker tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerTasks();
  }, [workerId]);

  if (loading) {
    return (
      <div>
        <OwnerSidebar />
        <div className="container mt-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading worker tasks...</p>
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
        {workerTasks.length === 0 ? (
          <p>No tasks found for this worker.</p>
        ) : (
          workerTasks.map((task, index) => (
            <div className="card mb-4" key={index}>
              <div className="card-header">
                Order ID: {task.order_id}
              </div>
              <div className="card-body">
                <p><strong>Order Date:</strong> {new Date(task.order_date).toLocaleDateString()}</p>
                <p><strong>Received Date:</strong> {new Date(task.receiveDate).toLocaleDateString()}</p>
                <p><strong>Customer:</strong> {task.firstName} {task.lastName}</p>
              </div>
            </div>
          ))
        )}
        <button onClick={() => navigate(-1)} className="btn btn-secondary">Back</button>
      </div>
    </div>
  );
};

export default WorkerTask;
