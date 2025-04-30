import React, { useState, useEffect } from "react";
import axios from "axios";
import OwnerSidebar from "../components/SideNav";
import "../styles/RevenueReport.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OwnerRevenueReport = () => {
  // Revenue Report states
  const [reports, setReports] = useState([]);
  const [startDate, setStartDate] = useState(""); // YYYY-MM-DD format
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Attendance & Productivity Report states
  const [attendanceReport, setAttendanceReport] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(false);

  // Function to fetch revenue report data from backend
  const fetchReports = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/reports/revenue", {
        params: { startDate, endDate }
      });
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching revenue report:", error);
      toast.error("Error fetching revenue report");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch employee attendance & productivity report data from backend
  const fetchAttendanceReport = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates for attendance report.");
      return;
    }
    setAttendanceLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/reports/attendance-productivity", {
        params: { startDate, endDate }
      });
      setAttendanceReport(response.data);
    } catch (error) {
      console.error("Error fetching attendance report:", error);
      toast.error("Error fetching attendance report");
    } finally {
      setAttendanceLoading(false);
    }
  };

  // Set default dates to the last 30 days on initial mount
  useEffect(() => {
    if (!startDate && !endDate) {
      const today = new Date();
      const priorDate = new Date();
      priorDate.setDate(today.getDate() - 30);
      setStartDate(priorDate.toISOString().split("T")[0]);
      setEndDate(today.toISOString().split("T")[0]);
    }
  }, []);

  // Fetch revenue report when the dates are set/changed
  useEffect(() => {
    if (startDate && endDate) {
      fetchReports();
    }
  }, [startDate, endDate]);

  // Calculate total revenue from all revenue reports
  const totalRevenue = reports.reduce(
    (sum, report) => sum + Number(report.revenue), 0
  );

  // When printing the revenue report, call the print window
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <OwnerSidebar />
      <div className="owner-revenue-report-container">
        <div className="owner-revenue-report-content">
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
            <button onClick={fetchReports} className="btn btn-primary">
              {loading ? "Loading..." : "Get Report"}
            </button>
          </div>
          {reports.length === 0 ? (
            <p>No revenue data found for the selected period.</p>
          ) : (
            <>
              <table className="revenue-report-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Service Type</th>
                    <th>Revenue ($)</th>
                    <th>Order Date</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report) => (
                    <tr key={report.order_id}>
                      <td>{report.order_id}</td>
                      <td>{report.serviceType}</td>
                      <td>{report.revenue}</td>
                      <td>{new Date(report.order_date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="total-revenue">
                <h3>Total Revenue: ${totalRevenue.toFixed(2)}</h3>
              </div>
              <button onClick={handlePrint} className="btn btn-primary">
                Print Report
              </button>
            </>
          )}
          <br />
<br /><br /><br />
          <hr />
          <div className="attendance-report-section">
            <h2>Employee Attendance &amp; Productivity Report</h2>
            <p>
              Record of worker attendance linked to service performance, which can help optimize staffing.
            </p>
            <div className="filter-container">
              <button onClick={fetchAttendanceReport} className="btn btn-primary">
                {attendanceLoading ? "Loading..." : "Get Attendance Report"}
              </button>
            </div>
            {attendanceReport.length === 0 ? (
              <p>No attendance data found for the selected period.</p>
            ) : (
              <>
                <table className="attendance-report-table">
                  <thead>
                    <tr>
                      <th>Worker ID</th>
                      <th>Worker Name</th>
                      <th>Days Attended</th>
                      <th>Total Services</th>
                      <th>Productivity Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceReport.map((row) => (
                      <tr key={row.worker_id}>
                        <td>{row.worker_id}</td>
                        <td>{row.worker_name}</td>
                        <td>{row.days_attended}</td>
                        <td>{row.total_services}</td>
                        <td>{row.productivity_score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button onClick={() => window.print()} className="btn btn-primary">
                  Print Attendance Report
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OwnerRevenueReport;