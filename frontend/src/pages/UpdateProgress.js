import React, { useState } from "react";
import axios from "axios";
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar";
import "../styles/UpdateProgress.css";

const UpdateProgress = () => {
    const [taskId, setTaskId] = useState("");
    const [progress, setProgress] = useState(0);
    const [taskStarted, setTaskStarted] = useState(false);
    const [completeMessage, setCompleteMessage] = useState("");

    const handleStartTask = async () => {
        if (!taskId) {
            alert("Please enter Task ID to start the task!");
            return;
        }
        try {
            await axios.put("http://localhost:5000/Orders/startTask", { taskId });
            alert("Task started!");
            setTaskStarted(true);
        } catch (err) {
            console.error("Error starting task:", err);
            alert("Failed to start task");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskStarted) {
            alert("Please start the task first!");
            return;
        }
        try {
            const response = await axios.put("http://localhost:5000/Orders/updateProgress", { taskId, progress });
            alert(`Task ${taskId} updated to ${progress}% progress!`);
            if (progress >= 100) {
                setCompleteMessage("Task Completed!");
            } else {
                setCompleteMessage("");
            }
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
                    {!taskStarted && (
                        <button type="button" className="update-button" onClick={handleStartTask}>
                            Start Task
                        </button>
                    )}
                    {taskStarted && (
                        <>
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
                                Update Progress
                            </button>
                        </>
                    )}
                </form>
                {completeMessage && <p className="complete-message">{completeMessage}</p>}
            </div>
        </div>
    );
};

export default UpdateProgress;