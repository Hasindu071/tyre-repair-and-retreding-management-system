import React, { useState } from "react";
import OwnerSidebar from "../components/SideNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/WorkerPerformanceReport.css";
import { getWorkerPerformanceReport } from "../services/reportService";

const WorkerPerformanceReport = () => {
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
            const data = await getWorkerPerformanceReport(startDate, endDate);
            setReportData(data);
        } catch (error) {
            console.error("Error fetching worker performance report:", error);
            toast.error("Error fetching worker performance report");
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="worker-performance-report-page">
            <OwnerSidebar />
            <div className="worker-performance-report-container">
                <h2>Worker Performance Report</h2>
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
                                    <th>Worker ID</th>
                                    <th>Worker Name</th>
                                    <th>Total Orders</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.map((worker) => (
                                    <tr key={worker.workerId}>
                                        <td>{worker.workerId}</td>
                                        <td>{worker.workerName}</td>
                                        <td>{worker.totalOrders}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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

export default WorkerPerformanceReport;