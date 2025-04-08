import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
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
                const response = await axios.get("http://localhost:5000/services/getAssignedOrders");
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
                                <th>Service ID</th>
                                <th>Service Details</th>
                                <th>Receive Date</th>
                                <th>Notes</th>
                                <th>Inside Photo</th>
                                <th>Outside Photo</th>
                                <th>Worker Name</th>
                                <th>Total Amount</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.service_id}</td>
                                    <td>{task.tireBrand} {task.internalStructure}</td>
                                    <td>{task.receiveDate}</td>
                                    <td>{task.notes}</td>
                                    <td>
                                        {task.serviceDetails && task.serviceDetails.insidePhoto && (
                                            <img
                                                src={`http://localhost:5000${task.serviceDetails.insidePhoto}`}
                                                alt="Inside"
                                                style={{ width: "4cm", height: "4cm" }}
                                            />
                                        )}
                                    </td>
                                    <td>
                                        {task.serviceDetails && task.serviceDetails.outsidePhoto && (
                                            <img
                                                src={`http://localhost:5000${task.serviceDetails.outsidePhoto}`}
                                                alt="Outside"
                                                style={{ width: "4cm", height: "4cm" }}
                                            />
                                        )}
                                    </td>
                                    <td>
                                        {task.firstName 
                                            ? `${task.firstName} ${task.lastName}` 
                                            : "No worker assigned"}
                                    </td>
                                    <td>{task.total_amount || 0}</td>
                                    <td>
                                        <button 
                                            className="btn btn-primary me-2"
                                            onClick={() => handleViewClick(task)}
                                        >
                                            View
                                        </button>
                                        <button 
                                            className="btn btn-secondary"
                                            onClick={() => handleQRClick(task)}
                                        >
                                            QR Code
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
                                <p><strong>Service ID:</strong> {selectedTask.service_id}</p>
                                <p>
                                    <strong>Service Details:</strong> {selectedTask.tireBrand} {selectedTask.internalStructure}
                                </p>
                                <p><strong>Receive Date:</strong> {selectedTask.receiveDate}</p>
                                <p><strong>Notes:</strong> {selectedTask.notes}</p>
                                {selectedTask.serviceDetails && selectedTask.serviceDetails.insidePhoto && (
                                    <div>
                                        <p><strong>Inside Photo:</strong></p>
                                        <img
                                            src={`http://localhost:5000${selectedTask.serviceDetails.insidePhoto}`}
                                            alt="Inside"
                                            style={{ width: "4cm", height: "4cm" }}
                                        />
                                    </div>
                                )}
                                {selectedTask.serviceDetails && selectedTask.serviceDetails.outsidePhoto && (
                                    <div>
                                        <p><strong>Outside Photo:</strong></p>
                                        <img
                                            src={`http://localhost:5000${selectedTask.serviceDetails.outsidePhoto}`}
                                            alt="Outside"
                                            style={{ width: "4cm", height: "4cm" }}
                                        />
                                    </div>
                                )}
                                <p>
                                    <strong>Worker Name:</strong> {selectedTask.firstName ? `${selectedTask.firstName} ${selectedTask.lastName}` : "No worker assigned"}
                                </p>
                                <p><strong>Total Amount:</strong> {selectedTask.total_amount || 0}</p>
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
                                <h5 className="modal-title">QR Code for Service ID: {qrTask.service_id}</h5>
                                <button type="button" className="btn-close" onClick={handleCloseQRModal}></button>
                            </div>
                            <div className="modal-body" id="qr-code-printable" style={{ textAlign: "center" }}>
                            <QRCode 
                                    value={JSON.stringify({
                                        service_id: qrTask.service_id,
                                        tireBrand: qrTask.tireBrand,
                                        internalStructure: qrTask.internalStructure,
                                        receiveDate: qrTask.receiveDate,
                                        notes: qrTask.notes,
                                        workerName: qrTask.firstName ? `${qrTask.firstName} ${qrTask.lastName}` : "No worker assigned",
                                        total_amount: qrTask.total_amount || 0
                                    })}
                                />
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