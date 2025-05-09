import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar";
import '../styles/WorkerProfile.css';
import { getWorkerProfile } from "../services/workerServices";

const WorkerProfile = () => {
    // Retrieve the worker ID from localStorage (if not found, fallback to '1')
    const storedWorkerId = localStorage.getItem("workerId") || 1;
    const [worker, setWorker] = useState({});

    useEffect(() => {
        const fetchWorkerDetails = async () => {
            try {
                const data = await getWorkerProfile(storedWorkerId);
                setWorker(data);
            } catch (error) {
                console.error("Error fetching worker details:", error);
            }
        };

        fetchWorkerDetails();
    }, [storedWorkerId]);

    return (
        <div>
            <WorkerNavbar />
            <br />
            <div className="worker-profile-container">
                <div className="profile-card-worker">
                    <h2>Worker Profile</h2>
                    {worker.profilePicture ? (
                        <img 
                            src={`http://localhost:5000${worker.profilePicture}`} 
                            alt="Worker Profile" 
                            className="profile-picture" 
                        />
                    ) : (
                        <div className="profile-placeholder">No Image Available</div>
                    )}
                    <div className="profile-info-worker">
                        <p><strong>Title:</strong> {worker.title || "N/A"}</p>
                        <p><strong>First Name:</strong> {worker.firstName || "N/A"}</p>
                        <p><strong>Last Name:</strong> {worker.lastName || "N/A"}</p>
                        <p><strong>NIC:</strong> {worker.nic || "N/A"}</p>
                        <p><strong>Email:</strong> {worker.email || "N/A"}</p>
                        <p><strong>Phone 1:</strong> {worker.phone1 || "N/A"}</p>
                        <p><strong>Phone 2:</strong> {worker.phone2 || "N/A"}</p>
                        <p><strong>Address:</strong> {worker.address1 || "N/A"}</p>
                        <p><strong>City:</strong> {worker.address2 || "N/A"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerProfile;