import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CustomerHandle.css";
//import Navbar from "../components/Navbars/OwnerRegiNavBar";
import OwnerSidebar from "../components/SideNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerHandle = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Fetch customer data from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
        toast.error("Error fetching customers");
      });
  }, []);

  // Filter customers based on search input
  const filteredCustomers = customers.filter((customer) =>
    customer.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open modal and prefill with customer data for editing
  const handleEdit = (customerId) => {
    const customer = customers.find(
      (cust) => cust.customer_id === customerId
    );
    setSelectedCustomer({ ...customer });
    setShowEditModal(true);
  };

  // API call to update the customer and update state
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/CustomerProfile/${selectedCustomer.customer_id}`,
        selectedCustomer
      );
      setCustomers((prev) =>
        prev.map((cust) =>
          cust.customer_id === selectedCustomer.customer_id
            ? selectedCustomer
            : cust
        )
      );
      setShowEditModal(false);
      toast.success("Customer updated successfully!");
    } catch (error) {
      console.error("Error updating customer:", error);
      toast.error("Failed to update customer profile");
    }
  };

  // Delete customer handler remains unchanged except for toast alerts
  const handleDelete = async (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`http://localhost:5000/CustomerProfile/${customerId}`);
        setCustomers((prev) =>
          prev.filter((cust) => cust.customer_id !== customerId)
        );
        toast.success("Customer deleted successfully!");
      } catch (error) {
        console.error("Error deleting customer:", error);
        toast.error("Error deleting customer");
      }
    }
  };

  return (
    <div>
            {/*<Navbar />*/}
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
                      <button
                        className="approve-button"
                        onClick={() => handleEdit(customer.customer_id)}
                      >
                        Edit
                      </button>
                      <button
                        className="cancel-button"
                        onClick={() => handleDelete(customer.customer_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="no-results">
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bootstrap Modal for Editing Customer */}
      {showEditModal && selectedCustomer && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Customer Profile</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowEditModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleUpdate}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedCustomer.customer_name}
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          customer_name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={selectedCustomer.customer_email}
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          customer_email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>NIC</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedCustomer.customer_nic}
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          customer_nic: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number 1</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedCustomer.customer_phone1}
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          customer_phone1: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number 2</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedCustomer.customer_phone2}
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          customer_phone2: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>House Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedCustomer.customer_address1}
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          customer_address1: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedCustomer.customer_address2}
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          customer_address2: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <input
                      type="text"
                      className="form-control"
                      value={selectedCustomer.customer_address3}
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          customer_address3: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <button type="submit" className="btn-update-profile">
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default CustomerHandle;