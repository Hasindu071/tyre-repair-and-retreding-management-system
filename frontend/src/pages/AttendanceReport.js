import React, { useState, useEffect } from "react";
import OwnerSidebar from "../components/SideNav";
import "../styles/AttendanceReport.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAttendanceReport } from "../services/reportService";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import companyLogo from "../assets/Logo.png";

const AttendanceReport = () => {
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

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

  // Fetch report when dates change
  const getAttendanceReport = React.useCallback(async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
    setLoading(true);
    try {
      const data = await fetchAttendanceReport(startDate, endDate);
      setReportData(data);
    } catch (error) {
      console.error("Error fetching attendance report:", error);
      toast.error("Error fetching attendance report");
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startDate && endDate) {
      getAttendanceReport();
    }
  }, [startDate, endDate, getAttendanceReport]);

  // Calculate summary statistics
  const totalWorkers = reportData.length;
  const averageAttendance = totalWorkers > 0 
    ? reportData.reduce((sum, row) => sum + row.days_attended, 0) / totalWorkers 
    : 0;
  const averageProductivity = totalWorkers > 0 
    ? reportData.reduce((sum, row) => sum + (parseFloat(row.productivity_score) || 0), 0) / totalWorkers 
    : 0;
  const topPerformer = reportData.length > 0 
    ? reportData.reduce((max, worker) => 
        (parseFloat(worker.productivity_score) || 0) > (parseFloat(max.productivity_score) || 0) ? worker : max
      ) 
    : null;

  const generatePDF = () => {
    const input = document.getElementById("report-print-area");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`attendance_report_${startDate}_to_${endDate}.pdf`);
    });
  };

  const getPerformanceColor = (score) => {
    const numericScore = parseFloat(score) || 0;
    if (numericScore >= 90) return "excellent";
    if (numericScore >= 75) return "good";
    if (numericScore >= 50) return "average";
    return "poor";
  };

  return (
    <div className="attendance-report-page">
      <OwnerSidebar />
      <div className="attendance-report-container">
        <h2>Employee Attendance & Productivity Report</h2>
        
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
          <button onClick={getAttendanceReport} className="btn btn-primary mt-4">
            {loading ? "Loading..." : "Refresh Report"}
          </button>
        </div>

        {reportData.length === 0 ? (
          <p>No attendance data found for the selected period.</p>
        ) : (
          <>
            <div id="report-print-area" className="report-print-area">
              {/* Report Header */}
              <div className="report-header">
                <div className="logo-container">
                  <img src={companyLogo} alt="Company Logo" className="report-logo" />
                </div>
                <div className="report-title">
                  <h1>Employee Attendance & Productivity Report</h1>
                  <p className="report-period">
                    {new Date(startDate).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()}
                  </p>
                  <p className="report-description">
                    Comprehensive analysis of employee attendance and work performance
                  </p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="metrics-container">
                <div className="metric-card">
                  <h3>Total Employees</h3>
                  <p>{totalWorkers}</p>
                </div>
                <div className="metric-card">
                  <h3>Avg. Attendance Days</h3>
                  <p>{averageAttendance.toFixed(1)}</p>
                </div>
                <div className="metric-card">
                  <h3>Avg. Productivity</h3>
                  <p>{averageProductivity.toFixed(1)}%</p>
                </div>
                <div className="metric-card">
                  <h3>Top Performer</h3>
                  <p>{topPerformer?.worker_name || "N/A"}</p>
                  <small>{topPerformer ? `${(parseFloat(topPerformer.productivity_score) || 0).toFixed(1)}%` : ""}</small>
                </div>
              </div>

              {/* Detailed Report Table */}
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Days Attended</th>
                    <th>Services Completed</th>
                    <th>Productivity</th>
                    <th>Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((row) => {
                    const productivity = parseFloat(row.productivity_score) || 0;
                    const performanceLevel = getPerformanceColor(row.productivity_score);
                    return (
                      <tr key={row.worker_id}>
                        <td>{row.worker_id}</td>
                        <td>{row.worker_name}</td>
                        <td>{row.days_attended}</td>
                        <td>{row.total_services}</td>
                        <td>{productivity.toFixed(1)}%</td>
                        <td>
                          <span className={`performance-badge ${performanceLevel}`}>
                            {performanceLevel.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Report Summary */}
              <div className="report-summary">
                <h3>Performance Analysis</h3>
                <div className="summary-grid">
                  <div>
                    <p>Reporting Period: <strong>{new Date(startDate).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()}</strong></p>
                    <p>Total Work Days: <strong>{Math.max(...reportData.map(r => r.days_attended))}</strong></p>
                  </div>
                  <div>
                    <p>Highest Productivity: <strong>{Math.max(...reportData.map(r => parseFloat(r.productivity_score) || 0)).toFixed(1)}%</strong></p>
                    <p>Lowest Productivity: <strong>{Math.min(...reportData.map(r => parseFloat(r.productivity_score) || 0)).toFixed(1)}%</strong></p>
                  </div>
                </div>
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
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AttendanceReport;