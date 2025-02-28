import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar"; // Assuming you have a Navbar component
import '../styles/WorkerProfile.css';

const WorkerProfile = () => {
    const [worker, setWorker] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        role: '',
        assignedTasks: [],
        workHistory: []
    });

    const workerId = 1; // Replace with actual worker ID

    const fetchWorkerDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/workerProfile/getWorker/${workerId}`);
            const data = await response.json();
            setWorker({
                ...data,
                assignedTasks: data.assigned_tasks ? data.assigned_tasks.split(',') : [],
                workHistory: data.work_history ? data.work_history.split(',') : []
            });
        } catch (error) {
            console.error("Error fetching worker details:", error);
        }
    };

    useEffect(() => {
        fetchWorkerDetails();
    }, []);

    return (
        <div>
            <WorkerNavbar />
            <br />
            <div className="worker-profile-container">
                <div className="profile-card-worker">
                    <h2>Worker Profile</h2>
                    <div className="profile-info-worker">
                        <p><strong>Mr/Miss:</strong> {worker.title}</p>
                        <p><strong> First Name:</strong> {worker.firstName}</p>
                        <p><strong>Last Name:</strong> {worker.lastName}</p>
                        <p><strong>NIC:</strong> {worker.nic}</p>
                        <p><strong>Email:</strong> {worker.email}</p>
                        <p><strong>Phone 1:</strong> {worker.phone1}</p>
                        <p><strong>Phone 2:</strong> {worker.phone2}</p>
                        <p><strong>Address:</strong> {worker.address1}</p>
                        <p><strong>City:</strong> {worker.address2}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerProfile;