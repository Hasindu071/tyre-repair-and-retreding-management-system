import React, { useState, useEffect } from "react";
import WorkerSideBar from "../components/WorkerSideBar";
import "../styles/UpdateProgress.css";
import { getUpdateOrders, getStartedTasks, startTask, updateProgress } from "../services/orderServices";

const UpdateProgress = () => {
    const [taskId, setTaskId] = useState("");
    const [progress, setProgress] = useState(0);
    const [taskStarted, setTaskStarted] = useState(false);
    const [completeMessage, setCompleteMessage] = useState("");
    const [startedTasks, setStartedTasks] = useState([]);
    const [progressUpdates, setProgressUpdates] = useState({});
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        const workerId = localStorage.getItem("workerId");
        const fetchTasks = async () => {
            try {
                const res = await getUpdateOrders(workerId);
                setTasks(res);
            } catch (err) {
                console.error("Error fetching tasks:", err);
            }
        };
        fetchTasks();
    }, []);

    useEffect(() => {
        fetchStartedTasks();
    }, []);

    useEffect(() => {
        fetchStartedTasks();
    }, [taskStarted]);

    const fetchStartedTasks = async () => {
        try {
            const res = await getStartedTasks();
            setStartedTasks(res);
        } catch (err) {
            console.error("Error fetching started tasks:", err);
        }
    };

    const handleViewClick = (task) => {
        setSelectedTask(task);
        setTaskId(task.order_id);
    };

    const handleStartTask = async () => {
        if (!taskId) {
            alert("Please select a task to start!");
            return;
        }
        try {
            await startTask(taskId);
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
            await updateProgress(taskId, progress);
            alert(`Task ${taskId} updated to ${progress}% progress!`);
            if (progress >= 100) {
                setCompleteMessage("Task Completed!");
            } else {
                setCompleteMessage("");
            }
            fetchStartedTasks(); // Refetch started tasks
            window.location.reload(); // Refresh the page
        } catch (err) {
            console.error("Error updating progress:", err);
            alert("Failed to update progress");
        }
    };

    const handleIndividualUpdate = async (id) => {
        const updatedProgress = progressUpdates[id];
        if (updatedProgress === undefined) {
            alert("Please adjust the progress slider first.");
            return;
        }
        try {
            await updateProgress(id, updatedProgress);
            alert(`Task ${id} updated to ${updatedProgress}% progress!`);
            fetchStartedTasks();
        } catch (err) {
            console.error(`Error updating progress for task ${id}:`, err);
            alert("Failed to update progress for this task");
        }
    };

    return (
        <div>
            <WorkerSideBar />
            <div className="update-progress-page">
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
                                    <th>Service ID</th>
                                    <th>Service Details</th>
                                    <th>Receive Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task) => (
                                    <tr key={task.order_id}>
                                        <td>{task.order_id}</td>
                                        <td>{task.tireBrand} {task.internalStructure}</td>
                                        <td>{task.receiveDate}</td>
                                        <td>
                                            <button 
                                                type="button"
                                                className="select-button-update"
                                                onClick={() => handleViewClick(task)}
                                                disabled={selectedTask && selectedTask.order_id === task.order_id}
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
                                    onChange={(e) => setProgress(Number(e.target.value))}
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
                        <div key={task.order_id} className="task-container">
                            <h3>Task ID: {task.order_id}</h3>
                            <p>Current Progress: {task.progress}%</p>
                            <p>Status: {task.status}</p>
                            <label className="form-label">
                                Update Progress:
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={progressUpdates[task.order_id] !== undefined ? progressUpdates[task.order_id] : task.progress}
                                    onChange={(e) =>
                                        setProgressUpdates({
                                            ...progressUpdates,
                                            [task.order_id]: Number(e.target.value),
                                        })
                                    }
                                />
                                <span>
                                    {progressUpdates[task.order_id] !== undefined ? progressUpdates[task.order_id] : task.progress}%
                                </span>
                            </label>
                            <button
                                type="button"
                                className="update-button"
                                onClick={() => handleIndividualUpdate(task.order_id)}
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
    </div>
    );
};

export default UpdateProgress;