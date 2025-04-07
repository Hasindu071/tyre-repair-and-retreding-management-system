import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import OwnerSidebar from "../components/SideNav";
import "../styles/ApproveOrder.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApproveOrder = () => {
  const [repairs, setRepairs] = useState([]);
  const [retreadings, setRetreadings] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionNote, setRejectionNote] = useState("");

  useEffect(() => {
    fetchRepairs();
    fetchRetreadings();
  }, []);

  const fetchRepairs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/services/getRepairsApproved");
      setRepairs(response.data);
    } catch (error) {
      console.error("Error fetching repairs:", error);
      toast.error("Failed to fetch repair services");
    }
  };

  const fetchRetreadings = async () => {
    try {
      const response = await axios.get("http://localhost:5000/services/getRetreadingsApproved");
      setRetreadings(response.data);
    } catch (error) {
      console.error("Error fetching retreadings:", error);
      toast.error("Failed to fetch retreading services");
    }
  };


  return (
    <div>
      <OwnerSidebar />
      <div className="approve-order-container">
        <h2>Repair Services</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Puncture Size</th>
              <th>Tire Brand</th>
              <th>Internal Structure</th>
              <th>Patches Applied</th>
              <th>Receive Date</th>
              <th>Notes</th>
              <th>Inside Damage Photo</th>
              <th>Outside Damage Photo</th>
            </tr>
          </thead>
          <tbody>
            {repairs.map((repair) => (
              <tr key={repair.id}>
                <td>{repair.id}</td>
                <td>{repair.punctureSize}</td>
                <td>{repair.tireBrand}</td>
                <td>{repair.internalStructure}</td>
                <td>{repair.patchesApplied}</td>
                <td>{repair.receiveDate}</td>
                <td>{repair.notes}</td>
                <td>
                  {repair.insideDamagePhoto && (
                    <img
                      src={`http://localhost:5000${repair.insideDamagePhoto}`}
                      alt="Inside Damage"
                      style={{ width: "4cm", height: "4cm" }}
                    />
                  )}
                </td>
                <td>
                  {repair.outsideDamagePhoto && (
                    <img
                      src={`http://localhost:5000${repair.outsideDamagePhoto}`}
                      alt="Outside Damage"
                      style={{ width: "4cm", height: "4cm" }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Retreading Services</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Size Code</th>
              <th>Wheel Diameter</th>
              <th>Tire Width</th>
              <th>Tire Brand</th>
              <th>Tire Pattern</th>
              <th>Receive Date</th>
              <th>Tire Structure</th>
              <th>Notes</th>
              <th>Inside Photo</th>
              <th>Outside Photo</th>
            </tr>
          </thead>
          <tbody>
            {retreadings.map((retreading) => (
              <tr key={retreading.id}>
                <td>{retreading.id}</td>
                <td>{retreading.sizeCode}</td>
                <td>{retreading.wheelDiameter}</td>
                <td>{retreading.tireWidth}</td>
                <td>{retreading.tireBrand}</td>
                <td>{retreading.tirePattern}</td>
                <td>{retreading.receiveDate}</td>
                <td>{retreading.internalStructure}</td>
                <td>{retreading.notes}</td>
                <td>
                  {retreading.insidePhoto && (
                    <img
                      src={`http://localhost:5000${retreading.insidePhoto}`}
                      alt="Inside"
                      style={{ width: "4cm", height: "4cm" }}
                    />
                  )}
                </td>
                <td>
                  {retreading.outsidePhoto && (
                    <img
                      src={`http://localhost:5000${retreading.outsidePhoto}`}
                      alt="Outside"
                      style={{ width: "4cm", height: "4cm" }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showRejectModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enter Rejection Note</h5>
                <button type="button" className="btn-close" onClick={() => setShowRejectModal(false)}></button>
              </div>
              <div className="modal-body">
                <textarea
                  className="form-control"
                  placeholder="Enter special note for rejection..."
                  value={rejectionNote}
                  onChange={(e) => setRejectionNote(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ApproveOrder;