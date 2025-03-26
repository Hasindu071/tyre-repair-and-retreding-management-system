import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar";
import "../styles/history-of-works.css";

const HistoryOfWorks = () => {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const workerId = localStorage.getItem("workerId");
                // Adjust the endpoint and query params as necessary.
                const res = await axios.get("http://localhost:5000/Orders/completed", {
                    params: { workerId }
                });
                setWorks(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching history:", err);
                setError("Failed to fetch history.");
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    if (loading) {
        return (
            <div>
                <WorkerNavbar />
                <div className="history-container">
                    <p>Loading history...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <WorkerNavbar />
                <div className="history-container">
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <WorkerNavbar />
            <div className="history-container">
                <h2>History of Works</h2>
                {works.length ? (
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Task ID</th>
                                <th>Task Description</th>
                                <th>Completion Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {works.map((work) => (
                                <tr key={work.id}>
                                    <td>{work.id}</td>
                                    <td>{work.task}</td>
                                    <td>{work.completedDate}</td>
                                    <td>{work.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No completed tasks found.</p>
                )}
            </div>
        </div>
    );
};

export default HistoryOfWorks;