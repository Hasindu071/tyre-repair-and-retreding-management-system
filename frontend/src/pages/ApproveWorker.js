import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbars/OwnerRegiNavBar';
import OwnerSidebar from "../components/SideNav";
import "../styles/ApproveWorker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApproveWorker = () => {
  const [workers, setWorkers] = useState([]);

  const fetchWorkers = async () => {
    try {
      // Updated endpoint to match the backend route that returns registered workers
      const res = await fetch("http://localhost:5000/WorkerRegister");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setWorkers(data);
    } catch (err) {
      console.error("Error fetching workers:", err);
      toast.error("Error fetching workers");
    }
  };

  // Fetch workers when component mounts
  useEffect(() => {
    fetchWorkers();
  }, []);

  // Handle worker approval/rejection and refresh the worker list after updating
  const handleApproval = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/WorkerRegister/update-status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        toast.success(`Worker ${status.toLowerCase()} successfully`);
        // Re-fetch the worker list after successful update
        fetchWorkers();
      } else {
        toast.error("Failed to update worker status");
      }
    } catch (error) {
      console.error("Error updating worker status:", error);
      toast.error("Error updating worker status");
    }
  };

  return (
    <div>
      <Navbar />
      <OwnerSidebar />
      <div className="approve-worker-container-worker">
        <h2 className="title-worker">Approve Workers</h2>
        {workers.length === 0 ? (
          <p>No pending workers.</p>
        ) : (
          <table className="worker-table-worker">
            <thead>
              <tr>
                <th>Worker ID</th>
                <th>Profile Photo</th>
                <th>Name</th>
                <th>Email</th>
                <th>NIC</th>
                <th>Address</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workers.map(worker => (
                <tr key={worker.id}>
                  <td>{worker.id}</td>
                  <td>
                    <img
                      src={`http://localhost:5000${worker.profilePicture}`}
                      alt="Profile"
                      className="profile-photo"
                    />
                  </td>
                  <td>{worker.title} {worker.firstName} {worker.lastName}</td>
                  <td>{worker.email}</td>
                  <td>{worker.nic}</td>
                  <td>{worker.address1} {worker.address2}</td>
                  <td>{worker.status}</td>
                  <td>
                    <button
                      className="approve-button-worker"
                      onClick={() => handleApproval(worker.id, "Approved")}
                      disabled={worker.status === "Approved"}
                    >
                      Approve
                    </button>
                    <button
                      className="cancel-button-worker"
                      onClick={() => handleApproval(worker.id, "Rejected")}
                      disabled={worker.status === "Rejected"}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ApproveWorker;