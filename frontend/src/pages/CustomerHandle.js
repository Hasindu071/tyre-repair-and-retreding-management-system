import React, { useState, useEffect } from "react";
import "../styles/CustomerHandle.css";
import OwnerSidebar from "../components/SideNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchFullCustomers,
  updateCustomerProfile,
} from "../services/ownerServices";

const CustomerHandle = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const loadCustomers = () => {
    fetchFullCustomers()
      .then((data) => {
        console.log(data); // Debugging: Check the structure of the data
        setCustomers(data); // Directly set the data since it already has firstName and lastName
      })
      .catch(() => toast.error("Error fetching customers"));
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      loadCustomers();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    `${customer.firstName} ${customer.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleEdit = (customerId) => {
    const customer = customers.find((cust) => cust.id === customerId);
    setSelectedCustomer({ ...customer });
    setShowEditModal(true);
  };

  const validateFields = () => {
    const {
      firstName,
      lastName,
      email,
      nic,
      phone1,
      phone2,
    } = selectedCustomer;

    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nicRegex = /^(\d{9}[vV]|\d{12})$/;
    const phoneRegex = /^\d{10}$/;

    if (!nameRegex.test(firstName)) {
      toast.error("First name must contain only letters and spaces");
      return false;
    }

    if (!nameRegex.test(lastName)) {
      toast.error("Last name must contain only letters and spaces");
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (!nicRegex.test(nic)) {
      toast.error("NIC must be 9 digits followed by 'V' or 12 digits");
      return false;
    }

    if (!phoneRegex.test(phone1)) {
      toast.error("Phone Number 1 must be 10 digits");
      return false;
    }

    if (phone2 && !phoneRegex.test(phone2)) {
      toast.error("Phone Number 2 must be 10 digits");
      return false;
    }

    return true;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const payload = {
      firstName: selectedCustomer.firstName,
      lastName: selectedCustomer.lastName,
      email: selectedCustomer.email,
      nic: selectedCustomer.nic,
      phone1: selectedCustomer.phone1,
      phone2: selectedCustomer.phone2,
      houseName: selectedCustomer.houseName,
      city: selectedCustomer.city,
      state: selectedCustomer.state,
    };

    try {
      await updateCustomerProfile(selectedCustomer.id, payload);
      setCustomers((prev) =>
        prev.map((cust) =>
          cust.id === selectedCustomer.id ? { ...cust, ...payload } : cust
        )
      );
      setShowEditModal(false);
      toast.success("Customer updated successfully!");
    } catch (error) {
      toast.error("Failed to update customer profile");
    }
  };


  return (
    <div>
      <OwnerSidebar />
      <div className="customer-handle-container">
        <h2 className="title">Customer Details</h2>
        <input
          type="text"
          placeholder="🔍 Search customer by name..."
          className="search-box"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="table-wrapper">
          <table className="customer-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
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
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.firstName}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.email}</td>
                    <td>{customer.nic}</td>
                    <td>{customer.phone1}</td>
                    <td>{customer.phone2}</td>
                    <td>{customer.houseName}</td>
                    <td>{customer.city}</td>
                    <td>{customer.state}</td>
                    <td>
                      <button
                        className="approve-button"
                        onClick={() => handleEdit(customer.id)}
                      >
                        Edit
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

      {/* Edit Modal */}
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
                  <div className="form-group-oo
                  
                  ">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control-oo"
                      value={selectedCustomer.firstName}
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          firstName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group-oo">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control-oo"
                      value={selectedCustomer.lastName}
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          lastName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group-oo">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control-oo"
                      value={selectedCustomer.email}
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group-oo">
                    <label>NIC</label>
                    <input
                      type="text"
                      className="form-control-oo"
                      value={selectedCustomer.nic}
                      pattern="^(\d{9}[vV]|\d{12})$"
                      title="NIC must be 9 digits followed by V or 12 digits"
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          nic: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group-oo">
                    <label>Phone Number 1</label>
                    <input
                      type="number"
                      className="form-control-oo"
                      value={selectedCustomer.phone1}
                      pattern="^\d{10}$"
                      title="Phone number must be 10 digits"
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          phone1: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group-oo">
                    <label>Phone Number 2</label>
                    <input
                      type="number"
                      className="form-control-oo"
                      value={selectedCustomer.phone2}
                      pattern="^\d{10}$"
                      title="Phone number must be 10 digits"
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          phone2: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group-oo">
                    <label>House Name</label>
                    <input
                      type="text"
                      className="form-control-oo"
                      value={selectedCustomer.houseName}
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          houseName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group-oo">
                    <label>City</label>
                    <input
                      type="text"
                      className="form-control-oo"
                      value={selectedCustomer.city}
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          city: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group-oo">
                    <label>State</label>
                    <input
                      type="text"
                      className="form-control-oo"
                      value={selectedCustomer.state}
                      onChange={(e) =>
                        setSelectedCustomer({
                          ...selectedCustomer,
                          state: e.target.value,
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