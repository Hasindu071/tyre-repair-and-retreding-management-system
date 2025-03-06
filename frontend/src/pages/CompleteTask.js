import React from "react";
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar";
import "../styles/CompleteTask.css";

const CompleteTask = () => {
    const handleComplete = () => {
        // Add complete task logic here
        alert("Task marked as complete!");
    };

    return (
        <div>
            <WorkerNavbar />
            <div className="complete-container">
                <h2 className="complete-title">Complete Task</h2>
                <p className="complete-subtitle">Finalize your task and mark it as complete:</p>
                <div className="complete-action">
                    <button className="complete-button" onClick={handleComplete}>
                        Mark as Complete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompleteTask;