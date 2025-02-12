import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // You can still use Bootstrap for grid layout, if needed.
import Navbar from '../components/NavBar';  // Assuming you have a NavBar component
import '../styles/OwnerRegister.css'; // Assuming you have a CSS file for styling
import { registerOwner } from '../api'; // Import the registerOwner function

const OwnerRegister = () => {
    const [setUsers] = useState([]);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        Confirm_Password: ''
    });

    useEffect(() => {
        axios
          .get("http://localhost:5000/users")
          .then((response) => setUsers(response.data))
          .catch((error) => console.error("Error fetching users:", error));
      }, [setUsers]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.Confirm_Password) {
            alert("Passwords do not match!");
            return;
        }
        else if (formData.secretKey !== "123456") {
            alert("Invalid secret key!");
            return;
        }
        try {
            await registerOwner(formData);
            console.log('Owner registered successfully');
            navigate('/login/owner'); // Redirect after successful registration
        } catch (error) {
            console.error('Error registering owner:', error);
        }
    };

    return (
        <div>
            {/* Include Navbar */}
            <Navbar />

            <div className="custom-container">
                <div className="custom-card">
                    <h2 className="register-owner-title">Owner <span>REGISTRATION</span></h2>
                    <p className="custom-subtitle">Create your account to get started!</p>

                    <form onSubmit={handleSubmit}>
                        <div className="custom-row">
                            <div className="custom-col">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="custom-input"
                                    required
                                />
                            </div>
                            <div className="custom-col">
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="custom-input"
                                    required
                                />
                            </div>
                            <div className="custom-col">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="custom-input"
                                    required
                                />
                            </div>
                            <div className="custom-col">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="custom-input"
                                    required
                                />
                            </div>
                            <div className="custom-col">
                                <input
                                    type="password"
                                    name="Confirm_Password"
                                    placeholder="Confirm Password"
                                    value={formData.Confirm_Password}
                                    onChange={handleChange}
                                    className="custom-input"
                                    required
                                />
                            </div>
                            <div className="custom-col">
                                <input
                                    type="password"
                                    name="secretKey"
                                    placeholder="Secret Key"
                                    value={formData.secretKey}
                                    onChange={handleChange}
                                    className="custom-input"
                                    required
                                />
                            </div>
                            <div className="custom-col full-width">
                                <button type="submit" className="custom-btn">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OwnerRegister;