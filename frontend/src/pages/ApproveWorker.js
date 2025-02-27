import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbars/OwnerRegiNavBar';
import OwnerSidebar from "../components/SideNav";
import "../styles/ApproveWorker.css";

const ApproveWorker = () => {
  const [workers, setWorkers] = useState([]);

  // Fetch pending workers from backend
  useEffect(() => {
    fetch("/workers/pending")
      .then(res => res.json())
      .then(data => setWorkers(data))
      .catch(err => console.error("Error fetching workers:", err));
  }, []);

  // Handle worker approval/rejection
  const handleApproval = async (id, status) => {
    try {
      const response = await fetch(`/workers/update-status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setWorkers(workers.filter(worker => worker.id !== id));
      }
    } catch (error) {
      console.error("Error updating worker status:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <OwnerSidebar />
      <div className="approve-worker-container">
        <h2 className="title">Approve Workers</h2>
        {workers.length === 0 ? (
          <p>No pending workers.</p>
        ) : (
          <table className="worker-table">
            <thead>
              <tr>
                <th>Worker ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workers.map(worker => (
                <tr key={worker.id}>
                  <td>{worker.id}</td>
                  <td>{worker.name}</td>
                  <td>{worker.address}</td>
                  <td>{worker.date}</td>
                  <td>
                    <button className="approve-button" onClick={() => handleApproval(worker.id, "Approved")}>
                      Approve
                    </button>
                    <button className="cancel-button" onClick={() => handleApproval(worker.id, "Rejected")}>
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ApproveWorker;
