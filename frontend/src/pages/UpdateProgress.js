import React, { useState } from "react";
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar";
import "../styles/UpdateProgress.css";

const UpdateProgress = () => {
    const [taskId, setTaskId] = useState("");
    const [progress, setProgress] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add update progress logic here
        alert(`Task ${taskId} updated to ${progress}% progress!`);
    };

    return (
        <div>
            <WorkerNavbar />
            <div className="update-container">
                <h2 className="update-title">Update Progress</h2>
                <p className="update-subtitle">Update the progress of your tasks:</p>
                <form className="progress-form" onSubmit={handleSubmit}>
                    <label className="form-label">
                        Task ID:
                        <input
                            type="text"
                            value={taskId}
                            onChange={(e) => setTaskId(e.target.value)}
                            placeholder="Enter Task ID"
                        />
                    </label>
                    <label className="form-label">
                        Progress: {progress}%
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={(e) => setProgress(e.target.value)}
                        />
                    </label>
                    <button type="submit" className="update-button">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProgress;