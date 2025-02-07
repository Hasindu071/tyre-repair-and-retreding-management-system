import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar"; // Assuming you have a Navbar component
import '../styles/WorkerProfile.css';

const WorkerProfile = () => {
    const [worker] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+1234567890',
        address: '123 Main St, City, Country',
        role: 'Tire Repair Specialist',
        assignedTasks: ['Puncture Repair - Order #1023', 'Tire Retreading - Order #1027'],
        workHistory: [
            'Completed Order #1001 - Puncture Repair',
            'Completed Order #1005 - Tire Replacement'
        ]
    });

    return (
        <div>
            <WorkerNavbar />
        <div className="worker-profile-container">
            <div className="profile-card-worker">
                <h2>Worker Profile</h2>
                <div className="profile-info-worker">
                    <p><strong>Name:</strong> {worker.name}</p>
                    <p><strong>Email:</strong> {worker.email}</p>
                    <p><strong>Phone:</strong> {worker.phone}</p>
                    <p><strong>Address:</strong> {worker.address}</p>
                    <p><strong>Role:</strong> {worker.role}</p>
                </div>
                <h3>Assigned Tasks</h3>
                <ul>
                    {worker.assignedTasks.map((task, index) => (
                        <li key={index}>{task}</li>
                    ))}
                </ul>
                <h3>Work History</h3>
                <ul>
                    {worker.workHistory.map((history, index) => (
                        <li key={index}>{history}</li>
                    ))}
                </ul>
                <button className="update-profile-worker-btn">Update Profile</button>
            </div>
        </div>    
    </div>
    );
};

export default WorkerProfile;