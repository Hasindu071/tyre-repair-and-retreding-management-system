import React, { useState, useEffect } from "react";
import OwnerSidebar from "../components/SideNav";
import "../styles/OwnerReport.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAttendanceReport } from "../services/reportService";

const AttendanceReport = () => {
  const [reportData, setReportData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const getAttendanceReport = async () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
    setLoading(true);
    try {
      const data = await fetchAttendanceReport(startDate, endDate);
      setReportData(data);
    } catch (error) {
      toast.error("Error fetching attendance report");
    } finally {
      setLoading(false);
    }
  };

  // On initial mount, set default dates (last 30 days)
  useEffect(() => {
    if (!startDate && !endDate) {
      const today = new Date();
      const priorDate = new Date();
      priorDate.setDate(today.getDate() - 30);
      setStartDate(priorDate.toISOString().split("T")[0]);
      setEndDate(today.toISOString().split("T")[0]);
    }
  }, []);

  // Fetch report whenever the dates change
  useEffect(() => {
    if (startDate && endDate) {
      getAttendanceReport();
    }
  }, [startDate, endDate]);

  // Print the report
  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <OwnerSidebar />
      <div className="owner-revenue-report-container">
        <div className="owner-revenue-report-content">
          <h2>Employee Attendance &amp; Productivity Report</h2>
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
            <button onClick={getAttendanceReport} className="btn btn-primary">
              {loading ? "Loading..." : "Get Report"}
            </button>
          </div>
          {reportData.length === 0 ? (
            <p>No attendance data found for the selected period.</p>
          ) : (
            <>
              <table className="revenue-report-table">
                <thead>
                  <tr>
                    <th>Worker ID</th>
                    <th>Worker Name</th>
                    <th>Days Attended</th>
                    <th>Total Services</th>
                    <th>Productivity Score (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((row) => {
                    // Convert productivity_score to a number. If conversion fails, default to 0.
                    const productivity = parseFloat(row.productivity_score) || 0;
                    return (
                      <tr key={row.worker_id}>
                        <td>{row.worker_id}</td>
                        <td>{row.worker_name}</td>
                        <td>{row.days_attended}</td>
                        <td>{row.total_services}</td>
                        <td>{productivity.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <button onClick={handlePrint} className="btn btn-primary">
                Print Report
              </button>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AttendanceReport;