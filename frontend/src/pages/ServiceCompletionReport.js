import React, { useState, useEffect } from "react";
import OwnerSidebar from "../components/SideNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ServiceCompletionReport.css";
import { fetchServiceCompletionReport } from "../services/reportService";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import companyLogo from "../assets/Logo.png";

const ServiceCompletionReport = () => {
    // Initialize reportData with a default structure to avoid errors when mapping
    const [reportData, setReportData] = useState({
        completed: [],
        inProgress: [],
        averageServiceTime: 0,
        completionRate: 0,
        dailyCompletionTrend: []
    });
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Set default dates (last 30 days) on initial mount
    useEffect(() => {
        if (!startDate && !endDate) {
            const today = new Date();
            const priorDate = new Date();
            priorDate.setDate(today.getDate() - 30);
            setStartDate(priorDate.toISOString().split("T")[0]);
            setEndDate(today.toISOString().split("T")[0]);
        }
    }, [startDate, endDate]);

    const fetchReport = async () => {
        if (!startDate || !endDate) {
            toast.error("Please select both start and end dates");
            return;
        }
        setLoading(true);
        try {
            const data = await fetchServiceCompletionReport(startDate, endDate);
            setReportData({
                completed: data.completed || [],
                inProgress: data.inProgress || [],
                averageServiceTime: data.averageServiceTime || 0,
                completionRate: data.completionRate || 0,
                dailyCompletionTrend: data.dailyCompletionTrend || []
            });
        } catch (error) {
            console.error("Error fetching service completion report:", error);
            toast.error("Error fetching service completion report");
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
            pdf.save(`service_completion_report_${startDate}_to_${endDate}.pdf`);
        });
    };

    // Calculate key statistics
    const totalOrders = reportData.completed.length + reportData.inProgress.length;
    const completionPercentage = totalOrders > 0 
        ? ((reportData.completed.length / totalOrders) * 100).toFixed(1)
        : 0;
    const avgServiceTime = typeof reportData.averageServiceTime === "number"
        ? reportData.averageServiceTime.toFixed(2)
        : "0.00";

    const getCompletionStatus = (percentage) => {
        if (percentage >= 90) return "excellent";
        if (percentage >= 75) return "good";
        if (percentage >= 50) return "fair";
        return "poor";
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
                        {loading ? "Loading..." : "Generate Report"}
                    </button>
                </div>

                {(reportData.completed.length > 0 || reportData.inProgress.length > 0) ? (
                    <>
                        <div id="report-print-area" className="report-print-area">
                            {/* Report Header */}
                            <div className="report-header">
                                <div className="logo-container">
                                    <img src={companyLogo} alt="Company Logo" className="report-logo" />
                                </div>
                                <div className="report-title">
                                    <h1>Service Completion Report</h1>
                                    <p className="report-period">
                                        {new Date(startDate).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()}
                                    </p>
                                    <p className="report-description">
                                        Analysis of service completion rates and performance metrics
                                    </p>
                                </div>
                            </div>

                            {/* Key Metrics */}
                            <div className="metrics-container">
                                <div className="metric-card">
                                    <h3>Total Orders</h3>
                                    <p>{totalOrders}</p>
                                </div>
                                <div className="metric-card">
                                    <h3>Completed Orders</h3>
                                    <p>{reportData.completed.length}</p>
                                </div>
                                <div className="metric-card">
                                    <h3>Completion Rate</h3>
                                    <p>{completionPercentage}%</p>
                                    <span className={`status-badge ${getCompletionStatus(completionPercentage)}`}>
                                        {getCompletionStatus(completionPercentage).toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            {/* Daily Completion Trend */}
                            <div className="trend-container">
                                <h3>Daily Completion Trend</h3>
                                <div className="trend-bars">
                                    {(reportData.dailyCompletionTrend || []).map((day) => (
                                        <div key={day.date} className="trend-bar-container">
                                            <div className="trend-label">
                                                {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                            </div>
                                            <div className="trend-bar">
                                                <div 
                                                    className="completed-bar"
                                                    style={{ width: `${(day.completed / (day.completed + day.inProgress)) * 100}%` }}
                                                ></div>
                                                <div 
                                                    className="in-progress-bar"
                                                    style={{ width: `${(day.inProgress / (day.completed + day.inProgress)) * 100}%` }}
                                                ></div>
                                            </div>
                                            <div className="trend-numbers">
                                                <span className="completed-count">{day.completed}</span>
                                                <span className="in-progress-count">{day.inProgress}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Detailed Reports */}
                            <div className="detailed-reports">
                                <div className="report-section">
                                    <h3>Completed Orders</h3>
                                    <table className="report-table">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Type of Service</th>
                                                <th>Completion Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportData.completed.map((order) => (
                                                <tr key={order.orderId}>
                                                    <td>{order.orderId}</td>
                                                    <td>{order.serviceId}</td>
                                                    <td>{new Date(order.date).toLocaleDateString()}</td>
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
                                                <th>Start Date</th>
                                                <th>Days Pending</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reportData.inProgress.map((order) => (
                                                <tr key={order.orderId}>
                                                    <td>{order.orderId}</td>
                                                    <td>{new Date(order.date).toLocaleDateString()}</td>
                                                    <td>
                                                        {Math.floor((new Date() - new Date(order.date)) / (1000 * 60 * 60 * 24))} days
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Report Summary */}
                            <div className="report-summary">
                                <h3>Performance Insights</h3>
                                <ul>
                                    <li>
                                        <strong>{completionPercentage}%</strong> of services were completed within the reporting period
                                    </li>
                                    <li>
                                        The average service completion time was <strong>{avgServiceTime} minutes</strong>
                                    </li>
                                    <li>
                                        The busiest day was <strong>
                                            {reportData.dailyCompletionTrend.length > 0 
                                                ? new Date(reportData.dailyCompletionTrend.reduce((max, day) => 
                                                    (day.completed + day.inProgress) > (max.completed + max.inProgress) ? day : max
                                                ).date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
                                                : 'N/A'
                                            }
                                        </strong> with {reportData.dailyCompletionTrend.length > 0 
                                            ? reportData.dailyCompletionTrend.reduce((max, day) => 
                                                (day.completed + day.inProgress) > (max.completed + max.inProgress) ? day : max
                                            ).completed + reportData.dailyCompletionTrend.reduce((max, day) => 
                                                (day.completed + day.inProgress) > (max.completed + max.inProgress) ? day : max
                                            ).inProgress
                                            : 0
                                        } total services
                                    </li>
                                </ul>
                            </div>

                            {/* Report Footer */}
                            <div className="report-footer">
                                <p>Report generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
                                <p className="confidential">CONFIDENTIAL - For management use only</p>
                            </div>
                        </div>
                        
                        <div className="report-actions">
                            <button onClick={generatePDF} className="btn btn-secondary">
                                Download PDF Report
                            </button>
                        </div>
                    </>
                ) : (
                    <p>No service completion data available for the selected period.</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default ServiceCompletionReport;