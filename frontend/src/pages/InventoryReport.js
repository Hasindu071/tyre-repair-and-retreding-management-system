import React, { useState, useEffect } from "react";
import OwnerSidebar from "../components/SideNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/InventoryReport.css";
import { getInventoryReport } from "../services/reportService";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import companyLogo from "../assets/Logo.png"; 

const InventoryReport = () => {
    const [reportData, setReportData] = useState([]);
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
            const data = await getInventoryReport(startDate, endDate);
            setReportData(data);
        } catch (error) {
            console.error("Error fetching inventory report:", error);
            toast.error("Error fetching inventory report");
        } finally {
            setLoading(false);
        }
    };

    // Calculate inventory statistics
    const totalItemsUsed = reportData.reduce((sum, item) => sum + item.totalQuantityUsed, 0);
    const mostUsedProduct = reportData.length > 0 
        ? reportData.reduce((max, item) => 
            item.totalQuantityUsed > max.totalQuantityUsed ? item : max
          )
        : null;
    const workersInvolved = [...new Set(reportData.map(item => `${item.workerFirstName} ${item.workerLastName}`))].length;

    const generatePDF = () => {
        const input = document.getElementById("report-print-area");
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`inventory_report_${startDate}_to_${endDate}.pdf`);
        });
    };

    const getUsageLevel = (quantity) => {
        if (quantity >= 50) return "high";
        if (quantity >= 20) return "medium";
        return "low";
    };

    return (
        <div className="inventory-report-page">
            <OwnerSidebar />
            <div className="inventory-report-container">
                <h2>Inventory & Parts Usage Report</h2>
                
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
                        {loading ? "Loading..." : "Generate Report"}
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
                                    <h1>Inventory & Parts Usage Report</h1>
                                    <p className="report-period">
                                        {new Date(startDate).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()}
                                    </p>
                                    <p className="report-description">
                                        Analysis of parts and materials usage across all services
                                    </p>
                                </div>
                            </div>

                            {/* Key Metrics */}
                            <div className="metrics-container">
                                <div className="metric-card">
                                    <h3>Total Items Used</h3>
                                    <p>{totalItemsUsed}</p>
                                </div>
                                <div className="metric-card">
                                    <h3>Workers Involved</h3>
                                    <p>{workersInvolved}</p>
                                </div>
                                <div className="metric-card">
                                    <h3>Unique Products</h3>
                                    <p>{[...new Set(reportData.map(item => item.productName))].length}</p>
                                </div>
                            </div>

                            {/* Product Usage Breakdown */}
                            <div className="usage-breakdown">
                                <h3>Product Usage Distribution</h3>
                                <div className="product-bars">
                                    {reportData
                                        .sort((a, b) => b.totalQuantityUsed - a.totalQuantityUsed)
                                        .slice(0, 5)
                                        .map((item) => (
                                            <div key={item.productName} className="product-bar-container">
                                                <div className="product-label">
                                                    <span className="product-name">{item.productName}</span>
                                                    <span className="product-quantity">{item.totalQuantityUsed} units</span>
                                                </div>
                                                <div className="product-bar">
                                                    <div 
                                                        className={`product-bar-fill ${getUsageLevel(item.totalQuantityUsed)}`}
                                                        style={{
                                                            width: `${(item.totalQuantityUsed / mostUsedProduct.totalQuantityUsed) * 100}%`
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {/* Detailed Report Table */}
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Quantity Used</th>
                                        <th>Worker</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.map((row) => (
                                        <tr key={`${row.productName}-${row.workerId}`}>
                                            <td>{row.productName}</td>
                                            <td>{row.totalQuantityUsed}</td>
                                            <td>{row.workerFirstName} {row.workerLastName}</td>
                                            <td>{new Date(row.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Report Summary */}
                            <div className="report-summary">
                                <h3>Key Insights</h3>
                                <ul>
                                    <li>
                                        <strong>{mostUsedProduct?.productName || "N/A"}</strong> was the most used product with {mostUsedProduct?.totalQuantityUsed || 0} units consumed
                                    </li>
                                    <li>
                                        Top 5 products accounted for {reportData
                                            .sort((a, b) => b.totalQuantityUsed - a.totalQuantityUsed)
                                            .slice(0, 5)
                                            .reduce((sum, item) => sum + item.totalQuantityUsed, 0)} units ({Math.round(
                                                reportData
                                                    .sort((a, b) => b.totalQuantityUsed - a.totalQuantityUsed)
                                                    .slice(0, 5)
                                                    .reduce((sum, item) => sum + item.totalQuantityUsed, 0) / totalItemsUsed * 100
                                            )}% of total usage
                                    </li>
                                    <li>
                                        {workersInvolved} different workers were involved in parts usage during this period
                                    </li>
                                </ul>
                            </div>

                            {/* Report Footer */}
                            <div className="report-footer">
                                <p>Report generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
                                <p className="confidential">CONFIDENTIAL - For inventory management use only</p>
                            </div>
                        </div>
                        
                        <div className="report-actions">
                            <button onClick={generatePDF} className="btn btn-secondary">
                                Download PDF Report
                            </button>
                        </div>
                    </>
                ) : (
                    <p>No inventory data available for the selected period.</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default InventoryReport;