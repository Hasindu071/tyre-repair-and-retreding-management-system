import React, { useState, useEffect } from "react";
import axios from "axios";
//import Navbar from "../components/NavBar"; // Adjust import if needed
import OwnerSidebar from "../components/SideNav"; // Adjust import if needed
import '../styles/OwnerReport.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OwnerReport = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      // Adjust the API endpoint as per your backend
      const response = await axios.get("http://localhost:5000/reports");
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error("Error fetching reports");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div>
            {/*<Navbar />*/}
      <div className="owner-report-container">
        <OwnerSidebar />
        <div className="owner-report-content">
          <h2>Reports</h2>
          {reports.length === 0 ? (
            <p>No reports found.</p>
          ) : (
            <table className="report-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Report Title</th>
                  <th>Date</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.title}</td>
                    <td>{new Date(report.date).toLocaleDateString()}</td>
                    <td>{report.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OwnerReport;