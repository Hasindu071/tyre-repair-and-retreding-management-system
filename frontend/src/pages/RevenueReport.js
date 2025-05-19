import React, { useState, useEffect } from "react";
import OwnerSidebar from "../components/SideNav";
import "../styles/RevenueReport.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchRevenueReport } from "../services/reportService";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import companyLogo from "../assets/Logo.png"; 

const OwnerRevenueReport = () => {
  const [reports, setReports] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Set default dates to last 30 days on initial mount
  useEffect(() => {
    if (!startDate && !endDate) {
      const today = new Date();
      const priorDate = new Date();
      priorDate.setDate(today.getDate() - 30);
      setStartDate(priorDate.toISOString().split("T")[0]);
      setEndDate(today.toISOString().split("T")[0]);
    }
  }, [startDate, endDate]);

  // Fetch reports when dates change
  const fetchReports = React.useCallback(async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
    setLoading(true);
    try {
      const data = await fetchRevenueReport(startDate, endDate);
      setReports(data);
    } catch (error) {
      console.error("Error fetching revenue report:", error);
      toast.error("Error fetching revenue report");
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startDate && endDate) {
      fetchReports();
    }
  }, [startDate, endDate, fetchReports]);

  // Calculate various revenue metrics
  const totalRevenue = reports.reduce((sum, report) => sum + Number(report.revenue), 0);
  const averageRevenue = reports.length > 0 ? totalRevenue / reports.length : 0;
  const highestRevenue = reports.length > 0 ? Math.max(...reports.map(r => Number(r.revenue))) : 0;
  const lowestRevenue = reports.length > 0 ? Math.min(...reports.map(r => Number(r.revenue))) : 0;

  const generatePDF = () => {
    const input = document.getElementById("report-print-area");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`revenue_report_${startDate}_to_${endDate}.pdf`);
    });
  };

  return (
    <div className="owner-revenue-page">
      <OwnerSidebar />
      <div className="owner-revenue-container">
        <h2>Revenue Report</h2>
        
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
          <button onClick={fetchReports} className="btn btn-primary mt-4">
            {loading ? "Loading..." : "Refresh Report"}
          </button>
        </div>

        {reports.length === 0 ? (
          <p>No revenue data found for the selected period.</p>
        ) : (
          <>
            <div id="report-print-area" className="report-print-area">
              {/* Report Header */}
              <div className="report-header">
                <div className="logo-container">
                  <img src={companyLogo} alt="Company Logo" className="report-logo" />
                </div>
                <div className="report-title">
                  <h1>Revenue Analysis Report</h1>
                  <p className="report-period">
                    {new Date(startDate).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()}
                  </p>
                  <p className="report-description">
                    Comprehensive revenue breakdown by order with performance metrics
                  </p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="metrics-container">
                <div className="metric-card">
                  <h3>Total Revenue</h3>
                  <p>Rs.{totalRevenue.toFixed(2)}</p>
                </div>
                <div className="metric-card">
                  <h3>Total Orders</h3>
                  <p>{reports.length}</p>
                </div>
                <div className="metric-card">
                  <h3>Average Order Value</h3>
                  <p>Rs.{averageRevenue.toFixed(2)}</p>
                </div>
                <div className="metric-card">
                  <h3>Highest Single Order</h3>
                  <p>Rs.{highestRevenue.toFixed(2)}</p>
                </div>
              </div>

              {/* Detailed Report Table */}
              <table className="revenue-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Service Type</th>
                    <th>Revenue</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.order_id}>
                      <td>{report.order_id}</td>
                      <td>{report.serviceType}</td>
                      <td>${Number(report.revenue).toFixed(2)}</td>
                      <td>{new Date(report.order_date).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge ${report.status?.toLowerCase()}`}>
                          {report.status || "Completed"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Report Summary */}
              <div className="report-summary">
                <h3>Revenue Summary</h3>
                <div className="summary-grid">
                  <div>
                    <p>Period Start: <strong>{new Date(startDate).toLocaleDateString()}</strong></p>
                    <p>Period End: <strong>{new Date(endDate).toLocaleDateString()}</strong></p>
                  </div>
                  <div>
                    <p>Lowest Single Order: <strong>Rs.{lowestRevenue.toFixed(2)}</strong></p>
                    <p>Average Daily Revenue: <strong>Rs.{(totalRevenue/30).toFixed(2)}</strong></p>
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

export default OwnerRevenueReport;