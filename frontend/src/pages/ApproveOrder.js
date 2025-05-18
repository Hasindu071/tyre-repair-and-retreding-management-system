import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import OwnerSidebar from "../components/SideNav";
import "../styles/ApproveOrder.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAssignedOrders } from "../services/ownerServices";

const ApproveOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await fetchAssignedOrders();
      setOrders(data);
    } catch (error) {
      toast.error("Failed to fetch approved orders");
    }
  };

  return (
    <div className="approve-order-page">
      <OwnerSidebar />
      <div className="approve-order-container">
        <h1>Approve Orders</h1>
        <table className="order-table-approve">
          <thead>
            <tr>
              <th>Service ID</th>
              <th>Service Details</th>
              <th>Receive Date</th>
              <th>Notes</th>
              <th>Inside Photo</th>
              <th>Outside Photo</th>
              <th>Worker Name</th>
              <th>total Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.service_id}</td>
                <td>
                  {order.tireBrand} {order.internalStructure}
                </td>
                <td>{order.receiveDate}</td>
                <td>{order.notes}</td>
                <td>
                  {order.serviceDetails && order.serviceDetails.insidePhoto && (
                    <img
                      src={`http://localhost:5000${order.serviceDetails.insidePhoto}`}
                      alt="Inside"
                      style={{ width: "4cm", height: "4cm" }}
                    />
                  )}
                </td>
                <td>
                  {order.serviceDetails && order.serviceDetails.outsidePhoto && (
                    <img
                      src={`http://localhost:5000${order.serviceDetails.outsidePhoto}`}
                      alt="Outside"
                      style={{ width: "4cm", height: "4cm" }}
                    />
                  )}
                </td>
                <td>
                  {order.firstName 
                    ? `${order.firstName} ${order.lastName}` 
                    : "No worker assigned"}
                </td>
                <td>{order.total_amount || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ApproveOrder;