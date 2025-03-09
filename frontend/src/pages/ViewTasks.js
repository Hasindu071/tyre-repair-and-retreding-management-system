import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar";
import "../styles/ViewTasks.css";

const ViewTasks = () => {
    // Retrieve workerId from localStorage instead of hardcoding it
    const currentWorkerId = localStorage.getItem("workerId");

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            if (!currentWorkerId) {
                setError("Worker not authenticated.");
                setLoading(false);
                return;
            }
            try {
                // Pass the workerId in the query parameter to retrieve only assigned tasks
                const response = await axios.get(`http://localhost:5000/Orders/orders?workerId=${currentWorkerId}`);
                setTasks(response.data);
            } catch (err) {
                console.error("Error fetching tasks:", err);
                setError("Failed to load tasks.");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [currentWorkerId]);

    const handleViewClick = (task) => {
        setSelectedTask(task);
        setShowModal(true);
    };

    // This will close the modal
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTask(null);
    };

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
                                <th>Task</th>
                                <th>Customer Name</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.task}</td>
                                    <td>{task.customer}</td>
                                    <td>
                                        <button className="view-button" onClick={() => handleViewClick(task)}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No tasks assigned.</p>
                )}
            </div>

            {showModal && selectedTask && (
              // Clicking the backdrop closes the modal
                <div className="modal show d-block" tabIndex="-1" role="dialog" onClick={handleCloseModal}>
                    <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Task Details</h5>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={handleCloseModal}>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p><strong>ID:</strong> {selectedTask.id}</p>
                                <p><strong>Task:</strong> {selectedTask.task}</p>
                                <p><strong>Customer:</strong> {selectedTask.customer}</p>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={handleCloseModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </div>
            )}
        </div>
    );
};

export default ViewTasks;