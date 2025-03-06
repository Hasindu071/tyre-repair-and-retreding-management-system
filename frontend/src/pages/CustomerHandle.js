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
                <th>NIC</th>
                <th>Phone Number 1</th>
                <th>Phone Number 2</th>
                <th>House Name</th>
                <th>City</th>
                <th>State</th>
                <th>Action</th>

              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td>{customer.customer_id}</td>
                    <td>{customer.customer_name}</td>
                    <td>{customer.customer_email}</td>
                    <td>{customer.customer_nic}</td>
                    <td>{customer.customer_phone1}</td>
                    <td>{customer.customer_phone2}</td>
                    <td>{customer.customer_address1}</td>
                    <td>{customer.customer_address2}</td>
                    <td>{customer.customer_address3}</td>
                    <td>
                      <button className="approve-button">Edit</button>
                      <button className="cancel-button">Delete</button>
                    </td>
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