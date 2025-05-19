import React, { useState } from "react";
import OwnerSidebar from "../components/SideNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/DailyOrderSummaryReport.css";
import { getDailyOrderSummaryReport } from "../services/reportService";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import companyLogo from "../assets/Logo.png"; 

const DailyOrderSummaryReport = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState("");

    const fetchReport = async () => {
        if (!startDate) {
            toast.error("Please select a date");
            return;
        }
        setLoading(true);
        try {
            const data = await getDailyOrderSummaryReport(startDate);
            setReportData(data);
        } catch (error) {
            console.error("Error fetching daily orders summary:", error);
            toast.error("Error fetching daily orders summary");
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
            pdf.save(`daily_order_summary_report_${startDate}.pdf`);
        });
    };

    return (
        <div className="daily-order-summary-page">
            <OwnerSidebar />
            <div className="daily-order-summary-container">
                <h2>Daily Orders Summary Report</h2>
                <div className="filter-container">
                    <label htmlFor="startDate">Select Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <button onClick={fetchReport} className="btn btn-primary">
                        {loading ? "Loading..." : "Get Report"}
                    </button>
                </div>

                {reportData.length > 0 ? (
                    <>
                        <div id="report-print-area" className="report-print-area">
                            {/* Header for PDF */}
                            <div className="report-header">
                                <div className="logo-container">
                                    <img src={companyLogo} alt="Company Logo" className="report-logo" />
                                </div>
                                <div className="report-title">
                                    <h1>Daily Orders Summary Report</h1>
                                    <p className="report-description">
                                        This report contains a summary of all orders for the selected date, 
                                        including total revenue and average progress.
                                    </p>
                                    <p className="report-date">
                                        Date: {new Date(startDate).toLocaleDateString("en-US", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Report Table */}
                            <table className="report-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Total Orders</th>
                                        <th>Total Revenue ($)</th>
                                        <th>Average Progress (%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reportData.map((row) => (
                                        <tr key={row.date}>
                                            <td>
                                                {new Date(row.date).toLocaleDateString("en-US", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </td>
                                            <td>{row.totalOrders}</td>
                                            <td>{Number(row.totalRevenue).toFixed(2)}</td>
                                            <td>{row.averageProgress}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            
                            {/* Footer for PDF */}
                            <div className="report-footer">
                                <p>Generated on: {new Date().toLocaleDateString()}</p>
                                <p className="company-name">© {new Date().getFullYear()} Ryak Tyres. All rights reserved.</p>
                            </div>
                        </div>
                        
                        <button onClick={generatePDF} className="btn btn-secondary">
                            Generate PDF
                        </button>
                    </>
                ) : (
                    <p>No data available for the selected date.</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default DailyOrderSummaryReport;