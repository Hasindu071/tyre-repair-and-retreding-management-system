import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CustomerHandle.css";
import NewNavbar from "../components/Navbars/OwnerRegiNavBar";
import OwnerSidebar from "../components/SideNav";

const CustomerHandle = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState([]);

  // Fetch customer data from the backend
  useEffect(() => {
    axios.get("http://localhost:5000/customers")
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  // Filter customers based on search input
  const filteredCustomers = customers.filter((customer) =>
    customer.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <NewNavbar />
      <OwnerSidebar />
      <div className="customer-handle-container">
        <h2 className="title">Customer Details</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search customer by name..."
          className="search-box"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Customer Table */}
        <div className="table-wrapper">
          <table className="customer-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td>{customer.customer_id}</td>
                    <td>{customer.customer_name}</td>
                    <td>{customer.customer_email}</td>
                    <td>{customer.customer_phone}</td>
                    <td>{customer.customer_address}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-results">No customers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerHandle;