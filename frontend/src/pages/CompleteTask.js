import React, { useState, useEffect } from "react";
import axios from "axios";
import WorkerSideBar from "../components/WorkerSideBar";
import "../styles/CompleteTask.css";

const CompleteTask = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    try {
      // Ensure your backend has an endpoint that returns completed tasks.
      const response = await axios.get("http://localhost:5000/orders/getCompletedTasks");
      setCompletedTasks(response.data);
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
  };

  return (
    <div>
      <WorkerSideBar />
      <div className="complete-container">
  <h2 className="complete-title">Completed Tasks</h2>
  {completedTasks.length > 0 ? (
    <ul className="task-list">
      {completedTasks.map((task) => (
        <li key={task.id} className="task-item">
          <p><strong>ID:</strong> {task.order_id}</p>
          <p><strong>Customer:</strong> {task.customerFirstName ? `${task.customerFirstName} ${task.customerLastName}` : "N/A"}</p>
          <p><strong>Completed Date:</strong> {task.order_date || "N/A"}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Worker:</strong> {task.workerFirstName ? `${task.workerFirstName} ${task.workerLastName}` : "N/A"}</p>
          <p><strong>Total Amount:</strong> {task.total_amount || 0}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p className="complete-subtitle">No completed tasks found.</p>
  )}
</div>
    </div>
  );
};

export default CompleteTask;