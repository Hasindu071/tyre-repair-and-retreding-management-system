import React, { useState } from "react";
import "../styles/CustomerHandle.css"; // Import CSS file
import NewNavbar from "../components/Navbars/OwnerRegiNavBar"; // Owner's Navbar
import OwnerSidebar from "../components/SideNav";

const CustomerHandle = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample customer data (Can be fetched from an API in the future)
  const [customers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", address: "123 Main St, NY" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", address: "456 Park Ave, CA" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", phone: "456-789-1234", address: "789 Broadway, TX" },
  ]);

  // Filter customers based on search input
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
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
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.address}</td>
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
