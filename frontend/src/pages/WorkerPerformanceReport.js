import React, { useState } from "react";
import OwnerSidebar from "../components/SideNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/WorkerPerformanceReport.css";
import { getWorkerPerformanceReport } from "../services/reportService";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import companyLogo from "../assets/Logo.png"; 

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

    const generatePDF = () => {
        const input = document.getElementById("report-print-area");
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`worker_performance_report_${startDate}_to_${endDate}.pdf`);
        });
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
                    <button onClick={fetchReport} className="btn btn-primary mt-4">
                        {loading ? "Loading..." : "Get Report"}
                    </button>
                </div>

                {reportData.length > 0 ? (
                    <>
                        <div id="report-print-area" className="report-print-area">
                            {/* Report Header */}
                            <div className="report-header">
                                <div className="logo-container">
                                    <img src={companyLogo} alt="Company Logo" className="report-logo" />
                                </div>
                                <div className="report-title">
                                    <h1>Worker Performance Report</h1>
                                    <p className="report-description">
                                        This report shows worker performance metrics between {new Date(startDate).toLocaleDateString()} and {new Date(endDate).toLocaleDateString()}
                                    </p>
                                    <p className="report-period">
                                        Report Period: {new Date(startDate).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Report Table */}
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        <th>Worker ID</th>
                                        <th>Worker Name</th>
                                        <th>Total Orders Completed</th>
                                        <th>Performance Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.map((worker) => (
                                        <tr key={worker.workerId}>
                                            <td>{worker.workerId}</td>
                                            <td>{worker.workerName}</td>
                                            <td>{worker.totalOrders}</td>
                                            <td>
                                                {worker.totalOrders > 50 ? "⭐️⭐️⭐️⭐️⭐️" : 
                                                 worker.totalOrders > 30 ? "⭐️⭐️⭐️⭐️" : 
                                                 worker.totalOrders > 15 ? "⭐️⭐️⭐️" : 
                                                 worker.totalOrders > 5 ? "⭐️⭐️" : "⭐️"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                            {/* Report Summary */}
                            <div className="report-summary">
                                <h3>Summary Statistics</h3>
                                <div className="summary-stats">
                                    <div className="stat-item">
                                        <span className="stat-label">Total Workers:</span>
                                        <span className="stat-value">{reportData.length}</span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">Total Orders:</span>
                                        <span className="stat-value">
                                            {reportData.reduce((sum, worker) => sum + worker.totalOrders, 0)}
                                        </span>
                                    </div>
                                    <div className="stat-item">
                                        <span className="stat-label">Average Orders/Worker:</span>
                                        <span className="stat-value">
                                            {Math.round(reportData.reduce((sum, worker) => sum + worker.totalOrders, 0) / reportData.length)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Report Footer */}
                            <div className="report-footer">
                                <p>Generated on: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
                                <p className="confidential">CONFIDENTIAL - For internal use only</p>
                            </div>
                        </div>
                        
                        <div className="report-actions">
                            <button onClick={generatePDF} className="btn btn-secondary">
                                Download PDF
                            </button>
                        </div>
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