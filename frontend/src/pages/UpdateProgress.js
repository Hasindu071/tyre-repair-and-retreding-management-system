// filepath: c:\Users\Hasindu Thirasara\Desktop\tyre-repair-and-retreding-management-system\frontend\src\pages\UpdateProgress.js
import React, { useState } from "react";
import axios from "axios";
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar";
import "../styles/UpdateProgress.css";

const UpdateProgress = () => {
    const [taskId, setTaskId] = useState("");
    const [progress, setProgress] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:5000/Orders/updateProgress", { taskId, progress });
            alert(`Task ${taskId} updated to ${progress}% progress!`);
        } catch (err) {
            console.error("Error updating progress:", err);
            alert("Failed to update progress");
        }
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