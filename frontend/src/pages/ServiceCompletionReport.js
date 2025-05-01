import React, { useState } from "react";
import axios from "axios";
import OwnerSidebar from "../components/SideNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ServiceCompletionReport.css";

const ServiceCompletionReport = () => {
    const [reportData, setReportData] = useState({
        completed: [],
        inProgress: [],
        averageServiceTime: 0
    });
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const fetchReport = async () => {
        if (!startDate || !endDate) {
            toast.error("Please select both start and end dates");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/reports/serviceCompletion", {
                params: { startDate, endDate }
            });
            // Expected response format:
            // {
            //   completed: [{ orderId, serviceTime, date }, ...],
            //   inProgress: [{ orderId, serviceTime, date }, ...],
            //   averageServiceTime: number
            // }
            setReportData(response.data);
        } catch (error) {
            console.error("Error fetching service completion report:", error);
            toast.error("Error fetching service completion report");
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="service-completion-report-page">
            <OwnerSidebar />
            <div className="service-completion-report-container">
                <h2>Service Completion Report</h2>
                <div className="filter-container">
                    <div className="filter-item">
                        <label htmlFor="startDate">Start Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="filter-item">
                        <label htmlFor="endDate">End Date:</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <button onClick={fetchReport} className="btn btn-primary">
                        {loading ? "Loading..." : "Get Report"}
                    </button>
                </div>

                {(reportData.completed.length > 0 || reportData.inProgress.length > 0) ? (
                    <>
                        <div className="report-section">
                            <h3>Completed Orders</h3>
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Service Time (mins)</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.completed.map((order) => (
                                        <tr key={order.orderId}>
                                            <td>{order.orderId}</td>
                                            <td>{order.serviceTime}</td>
                                            <td>{order.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="report-section">
                            <h3>In-Progress Orders</h3>
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Service Time (mins)</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.inProgress.map((order) => (
                                        <tr key={order.orderId}>
                                            <td>{order.orderId}</td>
                                            <td>{order.serviceTime ? order.serviceTime : "N/A"}</td>
                                            <td>{order.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="average-service-time">
                            <h3>Average Service Time: {reportData.averageServiceTime.toFixed(2)} mins</h3>
                        </div>
                        <button onClick={handlePrint} className="btn btn-secondary print-button">
                            Print Report
                        </button>
                    </>
                ) : (
                    <p>No data available for the selected period.</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default ServiceCompletionReport;