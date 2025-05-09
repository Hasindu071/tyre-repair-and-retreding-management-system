import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Navbar from '../components/Navbars/OwnerRegiNavBar';
import OwnerSidebar from "../components/SideNav";
import "../styles/PendingOrder.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getPendingRepairs, getPendingRetreadings, approveRepair, approveRetreading, rejectItem } from "../services/orderServices";

const PendingOrder = () => {
    const [repairs, setRepairs] = useState([]);
    const [retreadings, setRetreadings] = useState([]);
    const navigate = useNavigate();

    // State for rejection modal (common for repair or retreading)
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectionNote, setRejectionNote] = useState("");
    const [selectedRejectItem, setSelectedRejectItem] = useState(null);
    const [rejectType, setRejectType] = useState(""); // "repair" or "retreading"

    useEffect(() => {
        fetchRepairs();
        fetchRetreadings();
    }, []);

    const fetchRepairs = async () => {
        try {
            const data = await getPendingRepairs();
            setRepairs(data);
        } catch (error) {
            toast.error("Failed to fetch repair services");
        }
    };

    const fetchRetreadings = async () => {
        try {
            const data = await getPendingRetreadings();
            setRetreadings(data);
        } catch (error) {
            toast.error("Failed to fetch retreading services");
        }
    };

    // Called when clicking Reject on either a repair or retreading row
    const handleRejectClick = (item, type) => {
        setSelectedRejectItem(item);
        setRejectType(type);
        setRejectionNote(""); // Reset note
        setShowRejectModal(true);
    };

    // Called when confirming the rejection with a note
const handleConfirmRejection = async () => {
    if (!selectedRejectItem) return;
    try {
        await rejectItem(rejectType, selectedRejectItem.id, rejectionNote);
        toast.success("Rejection processed successfully");
        if (rejectType === "repair") {
            fetchRepairs();
        } else if (rejectType === "retreading") {
            fetchRetreadings();
        }
        setShowRejectModal(false);
        setSelectedRejectItem(null);
    } catch (error) {
        console.error("Error rejecting item:", error);
        toast.error("Error processing rejection");
    }
};

    return (
        <div className="pending-order-page">
            {/*<Navbar />*/}
            <OwnerSidebar />
            <div className="approve-order-container">
                <h2 className="title">Pending Repair Services</h2>
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
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repairs.map((repair) => (
                            <tr key={repair.id}>
                                <td>{repair.id}</td>
                                <td>{repair.patchesApplied}</td>
                                <td>{repair.punctureSize}</td>
                                <td>{repair.internalStructure}</td>
                                <td>{repair.tireBrand}</td>
                                <td>{repair.receiveDate}</td>
                                <td>{repair.notes}</td>
                                <td>
                                    {repair.insideDamagePhoto && (
                                        <img
                                            src={`http://localhost:5000${repair.insideDamagePhoto}`}
                                            alt="Damage"
                                            style={{ width: '4cm', height: '4cm' }}
                                        />
                                    )}
                                </td>
                                <td>
                                    {repair.outsideDamagePhoto && (
                                        <img
                                            src={`http://localhost:5000${repair.outsideDamagePhoto}`}
                                            alt="Damage"
                                            style={{ width: '4cm', height: '4cm' }}
                                        />
                                    )}
                                </td>
                                <td>{repair.serviceStatus}</td>
                                <td>
                                    <button
                                        className="view-btn-order"
                                        onClick={() => navigate(`/repairDetails/${repair.id}`)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="approve-btn-order"
                                        onClick={async () => {
                                            try {
                                                await approveRepair(repair.id);
                                                toast.success("Repair approved successfully");
                                                fetchRepairs();
                                            } catch (error) {
                                                console.error("Error approving repair:", error);
                                                toast.error("Error approving repair");
                                            }
                                        }}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="reject-btn-order"
                                        onClick={() => handleRejectClick(repair, "repair")}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2 className="title">Pending Retreading Services</h2>
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
                            <th>Status</th>
                            <th>Action</th>
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
                                            style={{ width: '4cm', height: '4cm' }}
                                        />
                                    )}
                                </td>
                                <td>
                                    {retreading.outsidePhoto && (
                                        <img
                                            src={`http://localhost:5000${retreading.outsidePhoto}`}
                                            alt="Outside"
                                            style={{ width: '4cm', height: '4cm' }}
                                        />
                                    )}
                                </td>
                                <td>{retreading.serviceStatus}</td>
                                <td>
                                    <button
                                        className="view-btn-order"
                                        onClick={() => navigate(`/retreadingDetails/${retreading.id}`)}
                                    >
                                        View
                                    </button>
                                    <button
                                        className="approve-btn-order"
                                        onClick={async () => {
                                            try {
                                                await approveRetreading(retreading.id);
                                                toast.success("Retreading approved successfully");
                                                fetchRetreadings();
                                            } catch (error) {
                                                console.error("Error approving retreading:", error);
                                                toast.error("Error approving retreading");
                                            }
                                        }}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="reject-btn-order"
                                        onClick={() => handleRejectClick(retreading, "retreading")}
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Rejection Modal */}
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
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowRejectModal(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={handleConfirmRejection}>
                                    Confirm Reject
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default PendingOrder;