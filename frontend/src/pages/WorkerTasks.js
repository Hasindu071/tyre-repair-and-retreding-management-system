import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import NewNavbar from "../components/Navbars/OwnerRegiNavBar";
import 'bootstrap/dist/css/bootstrap.min.css';

const WorkerTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workerTask, setWorkerTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkerTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/workerTask/${id}`);
        setWorkerTask(response.data);
      } catch (err) {
        console.error("Error fetching worker task:", err);
        setError("Failed to fetch worker task");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerTask();
  }, [id]);

  if (loading) {
    return (
      <div>
        <NewNavbar />
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
        <NewNavbar />
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
      <NewNavbar />
      <div className="container mt-4">
        <h2>Worker Task Details</h2>
        <div className="card">
          <div className="card-header">
            Worker ID: {id}
          </div>
          <div className="card-body">
            <h5 className="card-title">{workerTask.taskName || 'Task Name'}</h5>
            <p className="card-text">{workerTask.description || 'No description available.'}</p>
            {/* Add more details as necessary */}
            <button onClick={() => navigate(-1)} className="btn btn-secondary">Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerTask;