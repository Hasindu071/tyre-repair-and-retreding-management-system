import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from 'bootstrap';
import QRCode from "react-qr-code";
import WorkerSideBar from "../components/WorkerSideBar";
import { getAssignedOrders } from "../services/orderServices";
import "../styles/ViewTasks.css";

const ViewTasks = () => {
  const currentWorkerId = localStorage.getItem("workerId");

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [qrTask, setQrTask] = useState(null);
  const [patternImages] = useState({});


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

  const showModal = (modalId) => {
    const modalEl = document.getElementById(modalId);
    const modal = Modal.getOrCreateInstance(modalEl);
    modal.show();
  };

  const handleViewClick = (task) => {
    setSelectedTask(task);
    showModal("viewModal");
  };

  const handleQRClick = (task) => {
    setQrTask(task);
    showModal("qrModal");
  };

  const printQRCode = () => {
    const printContents = document.getElementById("qr-code-printable").innerHTML;
    const newWindow = window.open('', '', 'width=600,height=600');
    newWindow.document.write('<html><head><title>Print QR Code</title></head><body>');
    newWindow.document.write(printContents);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.print();
  };

  if (loading) return <div className="loader">Loading tasks...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <div className="view-tasks-wrapper">
        <WorkerSideBar />
        <div className="tasks-container">
          <h2 className="title">Assigned Tasks</h2>
          {/* Tasks Table Section */}
          {tasks.length ? (
            <section className="tasks-table-section">
              <div className="table-responsive">
                <table className="table table-hover align-middle text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>Service ID</th>
                      <th>Details</th>
                      <th>Date</th>
                      <th>Notes</th>
                      <th>Pattern</th>
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
                        <td>{task.tirePattern || "--"}</td>
                        <td>
                          {(task.serviceDetails?.insidePhoto || task.serviceDetails?.insideDamagePhoto) ? (
                            <img
                              src={`http://localhost:5000${task.serviceDetails?.insidePhoto || task.serviceDetails?.insideDamagePhoto}`}
                              alt="Inside"
                              className="task-photo"
                            />
                          ) : (
                            "No image available"
                          )}
                        </td>
                        <td>
                          {(task.serviceDetails?.outsidePhoto || task.serviceDetails?.outsideDamagePhoto) ? (
                            <img
                              src={`http://localhost:5000${task.serviceDetails?.outsidePhoto || task.serviceDetails?.outsideDamagePhoto}`}
                              alt="Outside"
                              className="task-photo"
                            />
                          ) : (
                            "No image available"
                          )}
                        </td>
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
            </section>
          ) : <p className="no-tasks">No tasks assigned.</p>}
        </div>
      </div>
      {/* Patterns Gallery Section */}
      <h3 className="subtitle" style={{ color: "#f8f9fa", marginLeft: '250px' }}>Tire Patterns</h3>
      <div
        className="pattern-gallery-worker"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#f8f9fa', 
          width: '50%',
          marginLeft: '250px',
          paddingTop: '20px',
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div
            key={num}
            className="pattern-update-item-worker"
            style={{
              flex: 'none',
              margin: '0 5px',
              padding: '10px',
              backgroundColor: '#fff', 
              width: '3cm',
              height: '3cm',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={
                patternImages[num]
                  ? patternImages[num]
                  : `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/assets/pattern/pattern${num}.jpg`
              }
              alt={`Pattern ${num}`}
              className="pattern-image-worker"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
            <div style={{ marginTop: '5px', fontWeight: 'bold', color: '#333' }}>{num}</div>
          </div>
        ))}
      </div>

      {/* View Task Modal */}
      <div className="modal-ss fade" id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="viewModalLabel">Task Details</h5>
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
                    <img 
                      src={`http://localhost:5000${
                        selectedTask.serviceDetails?.insidePhoto || selectedTask.serviceDetails?.insideDamagePhoto
                      }`}
                      alt="Inside" 
                      className="task-photo" 
                    />
                    <img 
                      src={`http://localhost:5000${
                        selectedTask.serviceDetails?.outsidePhoto || selectedTask.serviceDetails?.outsideDamagePhoto
                      }`}
                      alt="Outside" 
                      className="task-photo" 
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      <div className="modal-ss fade" id="qrModal" tabIndex="-1" aria-labelledby="qrModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="qrModalLabel">QR Code - Service ID: {qrTask?.service_id}</h5>
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
              <button type="button" className="btn btn-primary" onClick={printQRCode}>Print</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTasks;