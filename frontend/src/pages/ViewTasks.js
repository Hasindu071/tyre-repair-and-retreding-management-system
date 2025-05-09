import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as bootstrap from 'bootstrap';
import "../styles/ViewTasks.css";
import QRCode from "react-qr-code";
import WorkerSideBar from "../components/WorkerSideBar";
import { getAssignedOrders } from "../services/orderServices";

const ViewTasks = () => {
    const currentWorkerId = localStorage.getItem("workerId");

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [qrTask, setQrTask] = useState(null);

     useEffect(() => {
        const fetchTasks = async () => {
            if (!currentWorkerId) {
                setError("Worker not authenticated.");
                setLoading(false);
                return;
            }
            try {
                const data = await getAssignedOrders(currentWorkerId);
                setTasks(data);
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
        const modal = new bootstrap.Modal(document.getElementById('viewModal'));
        modal.show();
    };

    const handleQRClick = (task) => {
        setQrTask(task);
        const modal = new bootstrap.Modal(document.getElementById('qrModal'));
        modal.show();
    };

    const printQRCode = () => {
        const printContents = document.getElementById("qr-code-printable").innerHTML;
        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    if (loading) return <div className="loader">Loading tasks...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="view-tasks-wrapper">
            <WorkerSideBar />
            <div className="tasks-container">
                <h2 className="title">Assigned Tasks</h2>
                {tasks.length ? (
                    <div className="table-responsive">
                        <table className="table table-hover align-middle text-center">
                            <thead className="table-dark">
                                <tr>
                                    <th>Service ID</th>
                                    <th>Details</th>
                                    <th>Date</th>
                                    <th>Notes</th>
                                    <th>Inside</th>
                                    <th>Outside</th>
                                    <th>Worker</th>
                                    <th>Amount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map(task => (
                                    <tr key={task.id}>
                                        <td>{task.service_id}</td>
                                        <td>{task.tireBrand} {task.internalStructure}</td>
                                        <td>{task.receiveDate}</td>
                                        <td>{task.notes}</td>
                                        <td><img src={`http://localhost:5000${task.serviceDetails?.insidePhoto}`} alt="Inside" className="task-photo" /></td>
                                        <td><img src={`http://localhost:5000${task.serviceDetails?.outsidePhoto}`} alt="Outside" className="task-photo" /></td>
                                        <td>{task.firstName ? `${task.firstName} ${task.lastName}` : "N/A"}</td>
                                        <td>{task.total_amount || 0}</td>
                                        <td>
                                            <button className="btn btn-outline-info btn-sm" onClick={() => handleViewClick(task)}>View</button>
                                            <button className="btn btn-outline-dark btn-sm ms-2" onClick={() => handleQRClick(task)}>QR</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : <p className="no-tasks">No tasks assigned.</p>}
            </div>

            {/* Bootstrap Modal: View Task */}
            <div className="modal fade" id="viewModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Task Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            {selectedTask && (
                                <>
                                    <p><strong>Service ID:</strong> {selectedTask.service_id}</p>
                                    <p><strong>Details:</strong> {selectedTask.tireBrand} {selectedTask.internalStructure}</p>
                                    <p><strong>Date:</strong> {selectedTask.receiveDate}</p>
                                    <p><strong>Notes:</strong> {selectedTask.notes}</p>
                                    <p><strong>Worker:</strong> {selectedTask.firstName ? `${selectedTask.firstName} ${selectedTask.lastName}` : "N/A"}</p>
                                    <p><strong>Amount:</strong> {selectedTask.total_amount || 0}</p>
                                    <div className="photo-grid">
                                        <img src={`http://localhost:5000${selectedTask.serviceDetails?.insidePhoto}`} alt="Inside" className="task-photo" />
                                        <img src={`http://localhost:5000${selectedTask.serviceDetails?.outsidePhoto}`} alt="Outside" className="task-photo" />
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bootstrap Modal: QR Code */}
            <div className="modal fade" id="qrModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">QR Code - Service ID: {qrTask?.service_id}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body text-center" id="qr-code-printable">
                            {qrTask && (
                                <QRCode value={JSON.stringify({
                                    service_id: qrTask.service_id,
                                    tireBrand: qrTask.tireBrand,
                                    internalStructure: qrTask.internalStructure,
                                    receiveDate: qrTask.receiveDate,
                                    notes: qrTask.notes,
                                    workerName: qrTask.firstName ? `${qrTask.firstName} ${qrTask.lastName}` : "No worker assigned",
                                    total_amount: qrTask.total_amount || 0
                                })} />
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={printQRCode}>Print</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewTasks;
