import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbars/OwnerRegiNavBar';
import OwnerSidebar from "../components/SideNav";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../styles/WorkerTasks.css";

const WorkerTasks = () => {
  const { workerName } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchWorkerTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/orders/getWorkers/${workerName}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching worker tasks:", error);
      }
    };

    fetchWorkerTasks();
  }, [workerName]);

  return (
    <div>
      <Navbar />
      <OwnerSidebar />
      <div className="worker-tasks-container">
        <h2 className="title">Tasks for {workerName}</h2>
        <table className="tasks-table">
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Customer Name</th>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.customer}</td>
                <td>{task.task}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerTasks;