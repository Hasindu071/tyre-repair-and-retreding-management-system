import React, { useState, useEffect } from "react";
import OwnerSidebar from "../components/SideNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/CancellationReport.css";
import { fetchCancellationReport } from "../services/reportService";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import companyLogo from "../assets/Logo.png"; 

const CancellationReport = () => {
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
      const data = await fetchCancellationReport(startDate, endDate);
      setReportData(data);
    } catch (error) {
      console.error("Error fetching cancellation report:", error);
      toast.error("Error fetching cancellation report");
    } finally {
      setLoading(false);
    }
  };

  // Calculate cancellation statistics
  const totalCancellations = reportData.length;
  const cancellationReasons = reportData.reduce((acc, order) => {
    acc[order.reason] = (acc[order.reason] || 0) + 1;
    return acc;
  }, {});
  const mostCommonReason = Object.keys(cancellationReasons).length > 0 
    ? Object.keys(cancellationReasons).reduce((a, b) => 
        cancellationReasons[a] > cancellationReasons[b] ? a : b
      )
    : "N/A";

  const generatePDF = () => {
    const input = document.getElementById("report-print-area");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`cancellation_report_${startDate}_to_${endDate}.pdf`);
    });
  };

  const getReasonColor = (reason) => {
    const colors = {
      "Price": "#ff6b6b",
      "Schedule": "#4ecdc4",
      "Service": "#ffd166",
      "Other": "#a5d8ff",
      "Customer": "#cdb4db"
    };
    return colors[reason.split(" ")[0]] || "#adb5bd";
  };

  return (
    <div className="cancellation-report-page">
      <OwnerSidebar />
      <div className="cancellation-report-container">
        <h2>Cancellation Analysis Report</h2>
        
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
                  <h1>Cancellation Analysis Report</h1>
                  <p className="report-period">
                    {new Date(startDate).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()}
                  </p>
                  <p className="report-description">
                    Analysis of service cancellations and reasons
                  </p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="metrics-container">
                <div className="metric-card">
                  <h3>Total Cancellations</h3>
                  <p>{totalCancellations}</p>
                </div>
                <div className="metric-card">
                  <h3>Most Common Reason</h3>
                  <p>{mostCommonReason}</p>
                  <small>{cancellationReasons[mostCommonReason]} occurrences</small>
                </div>
              </div>

              {/* Reason Distribution */}
              <div className="reason-distribution">
                <h3>Cancellation Reasons Breakdown</h3>
                <div className="reason-bars">
                  {Object.entries(cancellationReasons).map(([reason, count]) => (
                    <div key={reason} className="reason-bar-container">
                      <div className="reason-label">
                        <span 
                          className="reason-color" 
                          style={{ backgroundColor: getReasonColor(reason) }}
                        ></span>
                        {reason}
                      </div>
                      <div className="reason-bar">
                        <div 
                          className="reason-bar-fill"
                          style={{
                            width: `${(count / totalCancellations) * 100}%`,
                            backgroundColor: getReasonColor(reason)
                          }}
                        ></div>
                        <span className="reason-count">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Cancellation Table */}
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Cancellation Reason</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((order) => (
                    <tr key={order.serviceId}>
                      <td>{order.serviceId}</td>
                      <td>
                        <span 
                          className="reason-badge"
                          style={{ backgroundColor: getReasonColor(order.reason) }}
                        >
                          {order.reason}
                        </span>
                      </td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Report Summary */}
              <div className="report-summary">
                <h3>Key Insights</h3>
                <ul>
                  <li>The most frequent cancellation reason was <strong>{mostCommonReason}</strong> ({cancellationReasons[mostCommonReason]} occurrences)</li>
                  <li>Peak cancellation days: { /* Add your peak days logic here */ }</li>
                  <li>{Math.round((cancellationReasons[mostCommonReason] / totalCancellations) * 100)}% of cancellations were due to {mostCommonReason}</li>
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
          <p>No cancelled orders found for the selected period.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CancellationReport;