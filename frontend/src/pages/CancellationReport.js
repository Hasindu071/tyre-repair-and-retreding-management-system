import React, { useState } from "react";
import OwnerSidebar from "../components/SideNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/CancellationReport.css";
import { fetchCancellationReport } from "../services/reportService";

const CancellationReport = () => {
    const [reportData, setReportData] = useState([]);
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
            const data = await fetchCancellationReport(startDate, endDate);
            setReportData(data);
        } catch (error) {
            toast.error("Error fetching cancellation report");
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="cancellation-report-page">
            <OwnerSidebar />
            <div className="cancellation-report-container">
                <h2>Cancellation Report</h2>
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

                {reportData.length > 0 ? (
                    <>
                        <table className="report-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Cancellation Reason</th>
                                    <th>Cancellation Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.map((order) => (
                                    <tr key={order.orderId}>
                                        <td>{order.orderId}</td>
                                        <td>{order.reason}</td>
                                        <td>{order.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={handlePrint} className="btn btn-secondary print-button">
                            Print Report
                        </button>
                    </>
                ) : (
                    <p>No cancelled orders found for the selected period.</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default CancellationReport;