import React from "react";
import { useNavigate } from "react-router-dom";
import OwnerSidebar from "../components/SideNav";
import "../styles/OwnerReport.css";

const OwnerSelectReport = () => {
  const navigate = useNavigate();

  // Define the list of report options with title, description, and target route.
  const reportOptions = [
    {
      title: "Daily Orders Summary",
      description: "Total orders placed, revenue generated, and progress status for each day.",
      path: "/reports/dailyOrdersSummary"
    },
    {
      title: "Service Completion Report",
      description: "List orders that are completed versus those still in progress; include average service time.",
      path: "/reports/serviceCompletion"
    },
    {
      title: "Worker Performance Report",
      description: "Report on number of orders handled by each worker, average turnaround time, and ratings if available.",
      path: "/reports/worker-performance"
    },
    {
      title: "Revenue Report",
      description: "Detailed revenue analysis from repairs and retreading services over a period.",
      path: "/reports/revenue"
    },
    {
      title: "Inventory & Parts Usage Report",
      description: "Track tyre parts and retreading materials used, with cost analysis per service.",
      path: "/reports/inventoryPartsUsage"
    },
    {
      title: "Cancellation & Refund Report",
      description: "List orders that were cancelled or refunded with reasons and their financial impact.",
      path: "/reports/cancellation-refunds"
    },
    {
      title: "Employee Attendance & Productivity Report",
      description: "Record of worker attendance linked to service performance, which can help optimize staffing.",
      path: "/reports/Employee-Attendance"
    }
  ];

  return (
    <div>
      <OwnerSidebar />
      <div className="owner-report-selection-container">
        <h2>Select Report to View</h2>
        <div className="report-options">
          {reportOptions.map((report, index) => (
            <div key={index} className="report-card">
              <h3>{report.title}</h3>
              <p>{report.description}</p>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate(report.path)}
              >
                View Report
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerSelectReport;