import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/WorkerImages.css'
import OwnerSidebar from "../components/SideNav";

const WorkerRegisterCreativeView = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/WorkerRegister/approveWorker');
        setWorkers(response.data);
      } catch (err) {
        console.error("Error fetching workers:", err);
        setError("Failed to fetch workers");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  if (loading) {
    return (
      <div>
        <OwnerSidebar />
        <div className="worker-profile-container text-center mt-5">
          <p>Loading workers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <OwnerSidebar />
        <div className="worker-profile-container text-center mt-5">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <OwnerSidebar />
      <div className="worker-profile-container">
        <h2 className="worker-profile-heading text-center">Registered Workers</h2>
        <div className="worker-profile-row row">
          {workers.map(worker => (
            <div className="worker-profile" key={worker.id}>
              <div className="worker-profile-card">
                {worker.profilePicture ? (
                  <img 
                    src={`http://localhost:5000${worker.profilePicture}`} 
                    alt="Profile" 
                    className="worker-profile-image" 
                    style={{ width: "150px", height: "150px", objectFit: "cover", border: "4px solid #fff", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                  />
                ) : (
                  <div 
                    className="worker-profile-placeholder"
                    style={{ width: "100px", height: "100px", fontSize: "14px" }}
                  >
                    No Image
                  </div>
                )}
                <div className="worker-profile-card-body">
                  <h5 className="worker-profile-name ">{worker.firstName} {worker.lastName}</h5>
                  <p className="worker-profile-title ">{worker.title}</p>
                  <p className="worker-profile-email">
                    <small className="text-muted">{worker.email}</small>
                  </p>
                </div>
                <div className="worker-profile-footer">
                  <button 
                    className="worker-profile-btn"
                    onClick={() => {
                      console.log(worker.id); // navigates to workerTask page
                      navigate(`/workerTask/${worker.id}`);
                    }}
                  >
                    View Tasks
                  </button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkerRegisterCreativeView;