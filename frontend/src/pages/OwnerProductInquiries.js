import React, { useEffect, useState } from "react";
import OwnerSidebar from "../components/SideNav";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/OnwerproductInquiries.css";  // Update as needed

const OwnerProductInquiries = () => {
  const [decreaseRecords, setDecreaseRecords] = useState([]);

  useEffect(() => {
    fetchDecreaseRecords();
  }, []);

  const fetchDecreaseRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products/getWorkerStockDecreases");
      setDecreaseRecords(response.data);
    } catch (error) {
      console.error("Error fetching worker stock decreases:", error);
      toast.error("Error fetching worker stock decreases");
    }
  };

  return (
    <div>
      <OwnerSidebar />
      <div className="worker-stock-decreases-container">
        <h2 className="title">Worker Stock Decrease Records</h2>
        <table className="decrease-table">
          <thead>
            <tr>
              <th>Record ID</th>
              <th>Product Name</th>
              <th>Worker Name</th>
              <th>Decrease Amount</th>
              <th>Decrease Date</th>
            </tr>
          </thead>
          <tbody>
            {decreaseRecords.length > 0 ? (
              decreaseRecords.map(record => (
                <tr key={record.id}>
                  <td>{record.id}</td>
                  <td>{record.productName}</td>
                  <td>{record.workerName}</td>
                  <td>{record.decrease_amount}</td>
                  <td>{record.decrease_date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OwnerProductInquiries;