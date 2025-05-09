import React, { useState } from "react";
import OwnerSidebar from "../components/SideNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/InventoryReport.css";
import { getInventoryReport } from "../services/reportService";

const InventoryReport = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

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
            toast.error("Error fetching inventory report");
        } finally {
            setLoading(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="inventory-report-page">
            <OwnerSidebar />
            <div className="inventory-report-container">
                <h2>Inventory &amp; Parts Usage Report</h2>
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
                    <button onClick={fetchReport} className="btn btn-primary">
                        {loading ? "Loading..." : "Get Report"}
                    </button>
                </div>

                {reportData.length > 0 ? (
                    <>
                        <table className="report-table">
                            <thead>
                                <tr>
                                    <th>Service ID</th>
                                    <th>Part/Material</th>
                                    <th>Quantity Used</th>
                                    <th>Unit Cost ($)</th>
                                    <th>Total Cost ($)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportData.map((row) => (
                                    <tr key={row.serviceId}>
                                        <td>{row.serviceId}</td>
                                        <td>{row.partName}</td>
                                        <td>{row.quantityUsed}</td>
                                        <td>{Number(row.unitCost).toFixed(2)}</td>
                                        <td>{(row.quantityUsed * row.unitCost).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button onClick={handlePrint} className="btn btn-secondary print-button">
                            Print Report
                        </button>
                    </>
                ) : (
                    <p>No data available for the selected period.</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default InventoryReport;