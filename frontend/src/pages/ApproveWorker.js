import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavBar'; // Import the Navbar component
import OwnerSidebar from "../components/SideNav";
import "../styles/ApproveWorker.css"; // Import the CSS file

const ApproveWorker = () => {
  const [workers, setWorkers] = useState([
    {
      id: "000001",
      name: "Hasindu Ihsanarsa",
      address: "John Doe, 456 Elm Street, Suite 3, Los Angeles, CA 90001, USA",
      date: "06 / 01 / 2021",
      status: "Pending",
    },
    {
      id: "000002",
      name: "Malintha Prasan",
      address: "Mr John Smith, 132, My Street, Brighton 5123, NY, England",
      date: "08 / 04 / 2022",
      status: "Pending",
    },
    {
      id: "000003",
      name: "Sashika Prakash",
      address: "Mr Daniel Ituchukwu, Navajo, 7, My Street, Lagos Nigeria",
      date: "08 / ?? / ????",
      status: "Pending",
    },
    {
      id: "000004",
      name: "Navindu Akulpa",
      address: "John Doe, 456 Elm Street, Suite 3, Los Angeles, CA 90001, USA",
      date: "06 / 01 / 2021",
      status: "Pending",
    },
  ]);

  const handleApproval = (id, status) => {
    const updatedWorkers = workers.map((worker) =>
      worker.id === id ? { ...worker, status } : worker
    );
    setWorkers(updatedWorkers);
  };

  return (
    <div>
        <Navbar />
        <OwnerSidebar />
    <div className="approve-worker-container">
      <h2 className="title">Approve Worker</h2>
      <table className="worker-table">
        <thead>
          <tr>
            <th>Worker ID</th>
            <th>Worker Name</th>
            <th>Address</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workers.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.id}</td>
              <td>{worker.name}</td>
              <td>{worker.address}</td>
              <td>{worker.date}</td>
              <td>
                {worker.status === "Pending" ? (
                  <>
                    <button
                      className="approve-button"
                      onClick={() => handleApproval(worker.id, "Approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="cancel-button"
                      onClick={() => handleApproval(worker.id, "Canceled")}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <span className={`status-${worker.status.toLowerCase()}`}>
                    {worker.status}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ApproveWorker;
