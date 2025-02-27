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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWorker({ ...worker, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/workerProfile/updateWorker/${workerId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(worker),
            });

            if (response.ok) {
                alert("Worker details updated successfully");
                fetchWorkerDetails(); // Refresh worker details
            } else {
                console.error("Error updating worker details");
            }
        } catch (error) {
            console.error("Error updating worker details:", error);
        }
    };

    useEffect(() => {
        fetchWorkerDetails();
    }, []);

    return (
        <div>
            <WorkerNavbar />
            <div className="worker-profile-container">
                <div className="profile-card-worker">
                    <h2>Worker Profile</h2>
                    <form onSubmit={handleUpdate}>
                        <div className="profile-info-worker">
                            <label>Name:</label>
                            <input type="text" name="name" value={worker.name} onChange={handleChange} required />
                            <label>Email:</label>
                            <input type="email" name="email" value={worker.email} onChange={handleChange} required />
                            <label>Phone:</label>
                            <input type="text" name="phone" value={worker.phone} onChange={handleChange} />
                            <label>Address:</label>
                            <input type="text" name="address" value={worker.address} onChange={handleChange} />
                            <label>Role:</label>
                            <input type="text" name="role" value={worker.role} onChange={handleChange} />
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
                        <button type="submit" className="update-profile-worker-btn">Update Profile</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WorkerProfile;