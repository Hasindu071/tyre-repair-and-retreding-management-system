import React, { useState } from "react";
import axios from "axios";
import OwnerSidebar from "../components/SideNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/DailyOrderSummaryReport.css";

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
            const response = await axios.get("http://localhost:5000/reports/dailyOrdersSummary", {
                params: { startDate }
            });
            setReportData(response.data);
        } catch (error) {
            console.error("Error fetching daily orders summary:", error);
            toast.error("Error fetching daily orders summary");
        } finally {
            setLoading(false);
        }
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
                                    <td>{row.date}</td>
                                    <td>{row.totalOrders}</td>
                                    <td>{Number(row.totalRevenue).toFixed(2)}</td>
                                    <td>{row.averageProgress}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data available for the selected date.</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default DailyOrderSummaryReport;