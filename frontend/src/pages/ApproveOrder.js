import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/Navbars/OwnerRegiNavBar';
import OwnerSidebar from "../components/SideNav";
import "../styles/ApproveOrder.css";
import axios from 'axios';

const ApproveOrder = () => {
  const [repairs, setRepairs] = useState([]);
  const [retreadings, setRetreadings] = useState([]);

  useEffect(() => {
    fetchRepairs();
    fetchRetreadings();
  }, []);

  const fetchRepairs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/services/getRepairs');
      setRepairs(response.data);
    } catch (error) {
      console.error("Error fetching repairs:", error);
    }
  };

  const fetchRetreadings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/services/getRetreadings');
      setRetreadings(response.data);
    } catch (error) {
      console.error("Error fetching retreadings:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <OwnerSidebar />
      <div className="approve-order-container">
        <h2 className="title">Repair Services</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Puncture Size</th>
              <th>Tire Brand</th>
              <th>Internal Structure</th>
              <th>Patches Applied</th>
              <th>Receive Date</th>
              <th>Notes</th>
              <th>Inside Damage Photo</th>
              <th>Outside Damage Photo</th>
            </tr>
          </thead>
          <tbody>
            {repairs.map((repair) => (
              <tr key={repair.id}>
                <td>{repair.id}</td>
                <td>{repair.patchesApplied}</td>
                <td>{repair.punctureSize}</td>
                <td>{repair.tireBrand}</td>
                <td>{repair.internalStructure}</td>
                <td>{repair.receiveDate}</td>
                <td>{repair.notes}</td>
                <td>
                  {repair.insideDamagePhoto && (
                    <img
                      src={`http://localhost:5000${repair.insideDamagePhoto}`}
                      alt="Damage"
                      style={{ width: '4cm', height: '4cm' }}
                    />
                  )}
                </td>
                <td>
                  {repair.outsideDamagePhoto && (
                    <img
                      src={`http://localhost:5000${repair.outsideDamagePhoto}`}
                      alt="Damage"
                      style={{ width: '4cm', height: '4cm' }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 className="title">Retreading Services</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Size Code</th>
              <th>Wheel Diameter</th>
              <th>Tire Width</th>
              <th>Tire Brand</th>
              <th>Tire Pattern</th>
              <th>Completion Date</th>
              <th>Tire Structure</th>
              <th>Notes</th>
              <th>insidePhoto</th>
              <th>outsidePhoto</th>
            </tr>
          </thead>
          <tbody>
            {retreadings.map((retreading) => (
              <tr key={retreading.id}>
                <td>{retreading.id}</td>
                <td>{retreading.sizeCode}</td>
                <td>{retreading.wheelDiameter}</td>
                <td>{retreading.tireWidth}</td>
                <td>{retreading.tireBrand}</td>
                <td>{retreading.tirePattern}</td>
                <td>{retreading.completionDate}</td>
                <td>{retreading.tireStructure}</td>
                <td>{retreading.notes}</td>
                <td>
                  {retreading.insidePhoto && (
                    <img
                      src={`http://localhost:5000${retreading.insidePhoto}`}
                      alt="Inside"
                      style={{ width: '4cm', height: '4cm' }}
                    />
                  )}
                </td>
                <td>
                  {retreading.outsidePhoto && (
                    <img
                      src={`http://localhost:5000${retreading.outsidePhoto}`}
                      alt="Outside"
                      style={{ width: '4cm', height: '4cm' }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveOrder;