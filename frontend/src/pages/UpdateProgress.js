import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar";
import "../styles/UpdateProgress.css";

const UpdateProgress = () => {
    const [taskId, setTaskId] = useState("");
    const [progress, setProgress] = useState(0);
    const [taskStarted, setTaskStarted] = useState(false);
    const [completeMessage, setCompleteMessage] = useState("");
    const [startedTasks, setStartedTasks] = useState([]);
    const [progressUpdates, setProgressUpdates] = useState({});
    // New state for the list of tasks assigned to this worker
    const [tasks, setTasks] = useState([]);

    // Fetch tasks for the logged in worker
    useEffect(() => {
        const workerId = localStorage.getItem("workerId");
        const fetchTasks = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/Orders/orders`, {
                    params: { workerId }
                });
                setTasks(res.data);
            } catch (err) {
                console.error("Error fetching tasks:", err);
            }
        };
        fetchTasks();
    }, []);

    const handleViewClick = (task) => {
        // When a task is selected, fill the Task ID input so the worker can update its progress.
        setTaskId(task.id);
        alert(`Task ${task.id} selected!`);
    };

    const handleStartTask = async () => {
        if (!taskId) {
            alert("Please select a task to start!");
            return;
        }
        try {
            await axios.put("http://localhost:5000/Orders/startTask", { taskId });
            alert("Task started!");
            setTaskStarted(true);
            fetchStartedTasks();
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
            await axios.put("http://localhost:5000/Orders/updateProgress", { taskId, progress });
            alert(`Task ${taskId} updated to ${progress}% progress!`);
            if (progress >= 100) {
                setCompleteMessage("Task Completed!");
            } else {
                setCompleteMessage("");
            }
            fetchStartedTasks();
        } catch (err) {
            console.error("Error updating progress:", err);
            alert("Failed to update progress");
        }
    };

    const fetchStartedTasks = async () => {
        try {
            const res = await axios.get("http://localhost:5000/Orders/getStartedTasks");
            setStartedTasks(res.data);
        } catch (err) {
            console.error("Error fetching started tasks:", err);
        }
    };

    const handleIndividualUpdate = async (id) => {
        const updatedProgress = progressUpdates[id];
        if (updatedProgress === undefined) {
            alert("Please adjust the progress slider first.");
            return;
        }
        try {
            await axios.put("http://localhost:5000/Orders/updateProgress", { taskId: id, progress: updatedProgress });
            alert(`Task ${id} updated to ${updatedProgress}% progress!`);
            fetchStartedTasks();
        } catch (err) {
            console.error(`Error updating progress for task ${id}:`, err);
            alert("Failed to update progress for this task");
        }
    };

    useEffect(() => {
        fetchStartedTasks();
    }, [taskStarted]);

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
                            placeholder="Enter Task ID or select from below"
                        />
                    </label>
                    <p className="tasks-subtitle">Here are your assigned tasks:</p>
                    {tasks.length ? (
                        <table className="tasks-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Task</th>
                                    <th>Customer Name</th>
                                    <th>Orders</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map(task => (
                                    <tr key={task.id}>
                                        <td>{task.id}</td>
                                        <td>{task.task}</td>
                                        <td>{task.customer}</td>
                                        <td>
                                            <button 
                                                type="button"
                                                className="view-button" 
                                                onClick={() => handleViewClick(task)}
                                            >
                                                Select
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No tasks assigned.</p>
                    )}
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

            <div className="started-tasks-container">
                <h2>Started Tasks</h2>
                {startedTasks.length ? (
                    startedTasks.map((task) => (
                        <div key={task.id} className="task-container">
                            <h3>Task ID: {task.id}</h3>
                            <p>Current Progress: {task.progress}%</p>
                            <p>Status: {task.status}</p>
                            <label className="form-label">
                                Update Progress:
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={progressUpdates[task.id] !== undefined ? progressUpdates[task.id] : task.progress}
                                    onChange={(e) =>
                                        setProgressUpdates({
                                            ...progressUpdates,
                                            [task.id]: e.target.value,
                                        })
                                    }
                                />
                                <span>
                                    {progressUpdates[task.id] !== undefined ? progressUpdates[task.id] : task.progress}%
                                </span>
                            </label>
                            <button
                                type="button"
                                className="update-button"
                                onClick={() => handleIndividualUpdate(task.id)}
                            >
                                Update This Task
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No tasks have been started yet.</p>
                )}
            </div>
        </div>
    );
};

export default UpdateProgress;