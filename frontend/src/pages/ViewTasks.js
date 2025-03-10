import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar";
import "../styles/ViewTasks.css";
import QRCode from "react-qr-code";

const ViewTasks = () => {
    const currentWorkerId = localStorage.getItem("workerId");

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // New state to handle QR modal
    const [qrTask, setQrTask] = useState(null);
    const [showQRModal, setShowQRModal] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            if (!currentWorkerId) {
                setError("Worker not authenticated.");
                setLoading(false);
                return;
            }
            try {
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

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTask(null);
    };

    // New function to handle QR button click
    const handleQRClick = (task) => {
        setQrTask(task);
        setShowQRModal(true);
    };

    const handleCloseQRModal = () => {
        setShowQRModal(false);
        setQrTask(null);
    };

    // New function to handle printing the QR Code.
    const printQRCode = () => {
        // Get the QR code container's HTML
        const printContents = document.getElementById("qr-code-printable").innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
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
                                <th>QR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.task}</td>
                                    <td>{task.customer}</td>
                                    <td>
                                        <button className="view-button" onClick={() => handleViewClick(task)}>
                                            View
                                        </button>
                                    </td>
                                    <td>
                                        <button className="view-button" onClick={() => handleQRClick(task)}>
                                            QR
                                        </button>
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
                <div className="modal show d-block" tabIndex="-1" role="dialog" onClick={handleCloseModal}>
                    <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Task Details</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>ID:</strong> {selectedTask.id}</p>
                                <p><strong>Task:</strong> {selectedTask.task}</p>
                                <p><strong>Customer:</strong> {selectedTask.customer}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </div>
            )}

            {showQRModal && qrTask && (
                <div className="modal show d-block" tabIndex="-1" role="dialog" onClick={handleCloseQRModal}>
                    <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">QR Code</h5>
                                <button type="button" className="btn-close" onClick={handleCloseQRModal}></button>
                            </div>
                            <div className="modal-body" id="qr-code-printable">
                                <QRCode
                                    value={`ID: ${qrTask.id}, Customer: ${qrTask.customer}`}
                                    size={128}
                                />
                                <p><strong>ID:</strong> {qrTask.id}</p>
                                <p><strong>Customer:</strong> {qrTask.customer}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseQRModal}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={printQRCode}>
                                    Print QR Code
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