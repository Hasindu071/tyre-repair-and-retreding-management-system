import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar";
import "../styles/ViewTasks.css";

const ViewTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("http://localhost:5000/Orders/orders");
                setTasks(response.data);
            } catch (err) {
                console.error("Error fetching tasks:", err);
                setError("Failed to load tasks.");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    if (loading) {
        return (
            <div>
                <WorkerNavbar />
                <div className="tasks-container">
                    <p>Loading tasks...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <WorkerNavbar />
                <div className="tasks-container">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <WorkerNavbar />
            <div className="tasks-container">
                <h2 className="tasks-title">View Tasks</h2>
                <p className="tasks-subtitle">Here are your assigned tasks:</p>
                {tasks.length ? (
                    <table className="tasks-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Task Name</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.taskName}</td>
                                    <td>{task.description}</td>
                                    <td>{task.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No tasks assigned.</p>
                )}
            </div>
        </div>
    );
};

export default ViewTasks;