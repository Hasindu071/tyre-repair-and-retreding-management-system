import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const WorkerRegisterTable = () => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/WorkerRegister');
        console.log(response.data);
        setWorkers(response.data);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchWorkers();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Registered Workers</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Profile Image</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {workers.map(worker => (
            <tr key={worker.id}>
              <td>
                {worker.profilePicture ? (
                  <img 
                    src={`http://localhost:5000${worker.profilePicture}`} 
                    alt="Profile" 
                    style={{ width: "4cm", height: "4cm", objectFit: "cover" }} 
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td>{worker.firstName} {worker.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerRegisterTable;