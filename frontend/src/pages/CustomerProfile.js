import React, { useState, useEffect } from "react";
import CustomerNavbar from "../components/Navbars/CustomerRegiNavBar";
import "../styles/CustomerProfile.css";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCustomerProfile, updateCustomerProfile } from "../services/CustomerService";

const CustomerProfile = () => {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        title: "",
        nic: "",
        phone1: "",
        phone2: "",
        houseName: "",
        city: "",
        state: "",
    });
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(profile);
    const { userID } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!userID) return;
            try {
                const data = await getCustomerProfile(userID);
                setProfile(data);
                setFormData(data);
            } catch (error) {
                toast.error("Failed to fetch profile");
            }
        };
        fetchProfile();
    }, [userID]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateCustomerProfile(userID, formData);
            setProfile(formData);
            setShowModal(false);
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    return (
        <div>
            <CustomerNavbar />
            <div className="profile-container">
                <h2 className="profile-title">Customer Profile</h2>
                <div className="profile-card">
                    <p><strong>First Name:</strong> {profile.firstName}</p>
                    <p><strong>Last Name:</strong> {profile.lastName}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>NIC:</strong> {profile.nic}</p>
                    <p><strong>Phone 1:</strong> {profile.phone1}</p>
                    <p><strong>Phone 2:</strong> {profile.phone2}</p>
                    <p><strong>House Name:</strong> {profile.houseName}</p>
                    <p><strong>City:</strong> {profile.city}</p>
                    <p><strong>State:</strong> {profile.state}</p>
                    <button className="btn btn-primary mt-3" onClick={() => setShowModal(true)}>
                        Edit Profile
                    </button>
                </div>
            </div>

            {showModal && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    role="dialog"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Profile</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <form onSubmit={handleUpdate}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="nic">NIC</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nic"
                                            name="nic"
                                            value={formData.nic}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone1">Phone 1</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone1"
                                            name="phone1"
                                            value={formData.phone1}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone2">Phone 2</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone2"
                                            name="phone2"
                                            value={formData.phone2}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="houseName">House Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="houseName"
                                            name="houseName"
                                            value={formData.houseName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="city">City</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="state">State</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="state"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default CustomerProfile;