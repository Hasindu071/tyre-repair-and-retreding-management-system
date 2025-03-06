import React from "react";
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar";
import "../styles/ViewTasks.css";

const ViewTasks = () => {
    return (
        <div>
            <WorkerNavbar />
            <div className="tasks-container">
                <h2 className="tasks-title">View Tasks</h2>
                <p className="tasks-subtitle">Here are your assigned tasks:</p>
                <ul className="tasks-list">
                    <li>Task 1 - Repair brake pads</li>
                    <li>Task 2 - Inspect tire wear</li>
                    <li>Task 3 - Update service report</li>
                </ul>
            </div>
        </div>
    );
};

export default ViewTasks;