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

        // Validate first & last name: only letters, spaces, and apostrophes allowed.
        const nameRegex = /^[A-Za-z\s']+$/;
        if (!nameRegex.test(formData.firstName)) {
            toast.error("First Name can only contain letters, spaces, and apostrophes.");
            return;
        }
        if (!nameRegex.test(formData.lastName)) {
            toast.error("Last Name can only contain letters, spaces, and apostrophes.");
            return;
        }

        // Validate email address format.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        // Validate NIC (either legacy: 9 digits followed by V/v/X/x or exactly 12 digits)
        const nicRegex = /^(?:[0-9]{9}[VvXx]|\d{12})$/;
        if (!nicRegex.test(formData.nic)) {
            toast.error("Please enter a valid NIC number.");
            return;
        }

        // Validate Phone 1 (exactly 10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(formData.phone1)) {
            toast.error("Please enter a valid 10-digit phone number for Phone 1.");
            return;
        }
        // Validate Phone 2 if provided (exactly 10 digits)
        if (formData.phone2 && formData.phone2.trim() !== "" && !phoneRegex.test(formData.phone2)) {
            toast.error("Please enter a valid 10-digit phone number for Phone 2.");
            return;
        }

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
                                <div className="modal-body-pp">
                                    <div className="form-group-pp">
                                        <label htmlFor="firstName">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control-pp"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group-pp">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control-pp"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group-pp">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            className="form-control-pp"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group-pp">
                                        <label htmlFor="nic">NIC</label>
                                        <input
                                            type="text"
                                            className="form-control-pp"
                                            id="nic"
                                            name="nic"
                                            value={formData.nic}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group-pp">
                                        <label htmlFor="phone1">Phone 1</label>
                                        <input
                                            type="text"
                                            className="form-control-pp"
                                            id="phone1"
                                            name="phone1"
                                            value={formData.phone1}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group-pp">
                                        <label htmlFor="phone2">Phone 2</label>
                                        <input
                                            type="text"
                                            className="form-control-pp"
                                            id="phone2"
                                            name="phone2"
                                            value={formData.phone2}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group-pp">
                                        <label htmlFor="houseName">House Name</label>
                                        <input
                                            type="text"
                                            className="form-control-pp"
                                            id="houseName"
                                            name="houseName"
                                            value={formData.houseName}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group-pp">
                                        <label htmlFor="city">City</label>
                                        <input
                                            type="text"
                                            className="form-control-pp"
                                            id="city"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group-pp">
                                        <label htmlFor="state">State</label>
                                        <input
                                            type="text"
                                            className="form-control-pp"
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
                                        className="btn-pp btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button type="submit" className="btn-pp btn-primary">
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