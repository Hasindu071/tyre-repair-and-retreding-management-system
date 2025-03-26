import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Named import for jwtDecode
import NewNavbar from "../components/Navbars/CustomerRegiNavBar"; // Navbar component
import { FaShoppingCart, FaClipboardList, FaMoneyBillAlt } from "react-icons/fa"; // Icons
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/CustomerDashboard.css"; // CSS file

const CustomerDashboard = () => {
    const navigate = useNavigate();
    const [workerDetails, setWorkerDetails] = useState(null);

    // Function to decode JWT and extract user details
    const getUserDetails = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        try {
            const decoded = jwtDecode(token);
            console.log("Decoded token:", decoded);
            return decoded;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    };

    const user = getUserDetails();

    // Fetch worker details using workerId from the token
    useEffect(() => {
        if (user && user.workerId) {
            fetch(`http://localhost:5000/workerProfile/getWorker/${user.workerId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => setWorkerDetails(data))
                .catch(error => console.error("Error fetching worker details:", error));
        }
    }, [user]);

    const handlePlaceOrder = () => {
        toast.info("Navigating to Place Your Order page");
        navigate("/service"); // Redirect to ChooseService page
    };

    const handleMyOrders = () => {
        toast.info("Fetching your orders...");
        navigate("/MyOrders"); // Redirect to MyOrders page
    };

    const handlePaymentBilling = () => {
        toast.info("Redirecting to Payment & Billing");
        navigate("/CustomerSeePaymentBilling"); // Redirect to PaymentBilling page
    };

    return (
        <div>
            <NewNavbar />
            <div className="customer-dashboard-container">
                <div className="customer-dashboard-card">
                    <h2 className="customer-dashboard-title">
                        {workerDetails ? (
                            <>Welcome, {workerDetails.firstName} {workerDetails.lastName} ID: {workerDetails.id}</>
                        ) : (
                            <>Welcome, {user && user.email ? user.email : "Customer"}!</>
                        )}
                    </h2>
                    <p className="customer-dashboard-subtitle">
                        Manage your profile, orders, and explore products.
                    </p>
                    <div className="customer-dashboard-grid">
                        {/* Place Order Section */}
                        <div className="customer-dashboard-item">
                            <FaShoppingCart size={50} className="customer-dashboard-icon" />
                            <h3>Place Your Order</h3>
                            <button className="customer-dashboard-button" onClick={handlePlaceOrder}>
                                View
                            </button>
                        </div>
                        {/* My Orders Section */}
                        <div className="customer-dashboard-item">
                            <FaClipboardList size={50} className="customer-dashboard-icon" />
                            <h3>My Orders</h3>
                            <button className="customer-dashboard-button" onClick={handleMyOrders}>
                                View
                            </button>
                        </div>
                        {/* Payment & Billing Section */}
                        <div className="customer-dashboard-item">
                            <FaMoneyBillAlt size={50} className="customer-dashboard-icon" />
                            <h3>Payment & Billing</h3>
                            <button className="customer-dashboard-button" onClick={handlePaymentBilling}>
                                View
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CustomerDashboard;