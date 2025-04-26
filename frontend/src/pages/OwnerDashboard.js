import React from "react";
import { useNavigate } from "react-router-dom";
import { 
    FaRegClipboard, 
    FaUserFriends, 
    FaUserCheck, 
    FaShoppingBag, 
    FaBoxOpen, 
    FaMoneyBillWave,
    FaUserClock,
    FaChartBar
} from 'react-icons/fa';
import OwnerNavbar from "../components/Navbars/OwnerRegiNavBar"; // Assuming you have a Navbar component
import "../styles/OwnerDashboard.css"; // Import the CSS file
//import { useOwnerAuth } from "../context/OwnerAuthContext"; 

const OwnerDashboard = () => {
    const navigate = useNavigate();
    //const { owner } = useOwnerAuth(); // owner should have firstName and lastName

    // Fallback in case owner information is not available
   /* const ownerName = owner 
      ?// `${owner.firstName} ${owner.lastName}` 
      : "Owner"; */

    const approveWorker = () => {
        navigate("/ApproveWorker"); // Redirect to ApproveWorker page
    };

    const approveOrder = () => {
        navigate("/Orders/PendingOrders"); // Redirect to ApproveOrder page
    };

    const assignWorker = () => {
        navigate("/AssignWorker"); // Redirect to AssignWorker page
    };

    const handleCustomer = () => {
        navigate("/CustomerHandle"); // Redirect to HandleCustomer page
    };

    const productInquiries = () => {
        navigate("/OwnerProductInquiries"); // Redirect to productInquiries page
    };

    const workerPayments = () => {
        navigate("/Owner/SeePayment"); // Redirect to WorkerPayments page
    };

    const customerPayments = () => {
        navigate("/Owner/SeeCustomerPayment"); // Redirect to CustomerPayments page
    };

    const customerNotice = () => {
        navigate("/Owner/SendNotice"); // Redirect to CustomerNotice page
    };

    const supplies = () => {
        navigate("/Owner/Supplies"); // Redirect to Supplies page
    };

    const UpdateTirePatterns = () => {
        navigate("/UpdateTirePatterns"); // Redirect to Supplies page
    };

    const UpdateWorkerAttendence = () => {
        navigate("/Owner/WorkerAttendance"); // Use the absolute path
      };

    const UpdateReports = () => {
        navigate("/OwnerReport"); // Redirect to Supplies page
    };

    return (
        <div>
            <OwnerNavbar />
            <div className="owner-dashboard-container">
                <h2 className="owner-dashboard-title">Owner Dashboard</h2>
                <p className="owner-dashboard-greeting">Welcome, {/* {ownerName}! */}</p>
                <p className="owner-dashboard-subtitle">Manage operations efficiently</p>

                <div className="owner-dashboard-grid">
                    {/* Approve Customer Orders */}
                    <div className="dashboard-section-owner">
                        <h3>Approve Customer Orders</h3>
                        <button className="dashboard-button-owner" onClick={approveOrder}>
                            <FaRegClipboard className="icon" /> View Orders
                        </button>
                    </div>

                    {/* Assign Workers */}
                    <div className="dashboard-section-owner">
                        <h3>Assign Workers</h3>
                        <button className="dashboard-button-owner" onClick={assignWorker}>
                            <FaUserFriends className="icon" /> Assign
                        </button>
                    </div>

                    {/* Approve New Workers */}
                    <div className="dashboard-section-owner">
                        <h3>Approve New Workers</h3>
                        <button className="dashboard-button-owner" onClick={approveWorker}>
                            <FaUserCheck className="icon" /> Approve
                        </button>
                    </div>

                    {/* Handle Customer */}
                    <div className="dashboard-section-owner">
                        <h3>Handle Customer</h3>
                        <button className="dashboard-button-owner" onClick={handleCustomer}>
                            <FaShoppingBag className="icon" /> Manage
                        </button>
                    </div>

                    {/* Product Inquiries */}
                    <div className="dashboard-section-owner">
                        <h3>Product Inquiries</h3>
                        <button className="dashboard-button-owner" onClick={productInquiries}>
                            <FaBoxOpen className="icon" /> View
                        </button>
                    </div>

                    {/* Worker Payments */}
                    <div className="dashboard-section-owner">
                        <h3>Worker Payments</h3>
                        <button className="dashboard-button-owner" onClick={workerPayments}>
                            <FaMoneyBillWave className="icon" /> Manage
                        </button>
                    </div>

                    {/* Customer Payments */}
                    <div className="dashboard-section-owner">
                        <h3>Customer Payments</h3>
                        <button className="dashboard-button-owner" onClick={customerPayments}>
                            <FaMoneyBillWave className="icon" /> Manage
                        </button>
                    </div>

                    {/* Customer Notice */}
                    <div className="dashboard-section-owner">
                        <h3>Customer Notice</h3>
                        <button className="dashboard-button-owner" onClick={customerNotice}>
                            <FaMoneyBillWave className="icon" /> Send
                        </button>
                    </div>

                    {/* Supplies Details */}
                    <div className="dashboard-section-owner">
                        <h3>Supplies Details</h3>
                        <button className="dashboard-button-owner" onClick={supplies}>
                            <FaMoneyBillWave className="icon" /> View
                        </button>
                    </div>

                    {/* Pattern update */}
                    <div className="dashboard-section-owner">
                        <h3>Pattern Update</h3>
                        <button className="dashboard-button-owner" onClick={UpdateTirePatterns}>
                            <FaRegClipboard className="icon" /> update
                        </button>
                    </div>

                     {/* worker attendence */}
                     <div className="dashboard-section-owner">
                        <h3>Worker Attendence</h3>
                        <button className="dashboard-button-owner" onClick={UpdateWorkerAttendence}>
                            <FaUserClock className="icon" /> Check
                        </button>
                    </div>

                    {/* Reports */}
                    <div className="dashboard-section-owner">
                        <h3>Reports</h3>
                        <button className="dashboard-button-owner" onClick={UpdateReports}>
                            <FaChartBar className="icon" /> See
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboard;