import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import OwnerSidebar from "../components/SideNav";
import '../styles/WorkerTasks.css'; // Import the CSS file

const WorkerTask = () => {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const [workerTasks, setWorkerTasks] = useState([]);
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
        const tasks = Array.isArray(response.data) ? response.data : [response.data];
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
    <div className="worker-task-container">
      <OwnerSidebar />
      <div className="container mt-4">
        <h2>Worker Task Details</h2>
        {workerTasks.length === 0 ? (
          <p>No tasks found for this worker.</p>
        ) : (
          <div className="table-responsive">
            <table className="task-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Order Date</th>
                  <th>Received Date</th>
                  <th>Customer Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {workerTasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.order_id}</td>
                    <td>{new Date(task.order_date).toLocaleDateString()}</td>
                    <td>{new Date(task.receiveDate).toLocaleDateString()}</td>
                    <td>{task.firstName} {task.lastName}</td>
                    <td>
                      <span className={`status-badge ${task.status || 'In Progress'}`}>
                        {task.status || 'In Progress'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">Back</button>
      </div>
    </div>
  );
};

export default WorkerTask;