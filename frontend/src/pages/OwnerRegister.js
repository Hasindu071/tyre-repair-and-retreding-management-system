import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavBar';
import '../styles/OwnerRegister.css';

const API_URL = "http://localhost:5000";

export const registerOwner = async (ownerData) => {
  try {
    const response = await axios.post(`${API_URL}/OwnerRegister`, ownerData);
    return response.data;
  } catch (error) {
    console.error("Error registering owner:", error);
    throw error;
  }
};

const OwnerRegister = () => {
    const [setUsers] = useState([]);
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        Confirm_Password: '',
        secretKey: ''
    });

    useEffect(() => {
        axios
          .get("http://localhost:5000/users")
          .then((response) => setUsers(response.data))
          .catch((error) => console.error("Error fetching users:", error));
    }, [setUsers]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // For firstName and lastName ensure no digits are added
        if ((name === "firstName" || name === "lastName") && /\d/.test(value)) {
            console.error(`Numbers are not allowed in ${name} field:`, value);
            alert("Numbers are not allowed in name fields");
            return;
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate email
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            alert("Please enter a valid email address!");
            return;
        }
        
        // Validate password length (minimum 6 characters)
        if(formData.password.length < 6){
            alert("Password must be at least 6 characters long!");
            return;
        }
        
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
            setSuccessMessage("Registration successful!");
            // After showing success message, navigate after a delay
            setTimeout(() => {
                navigate('/login/owner'); // Redirect after successful registration
            }, 3000);
        } catch (error) {
            console.error('Error registering owner:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="custom-container">
                <div className="custom-card">
                    <h2 className="register-owner-title">Owner <span>REGISTRATION</span></h2>
                    <p className="custom-subtitle">Create your account to get started!</p>
                    {successMessage && (
                        <div className="alert alert-success" role="alert">
                            {successMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="custom-row">
                            <div className="custom-col">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="custom-input"
                                    required
                                />
                            </div>
                            <div className="custom-col">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="custom-input"
                                    required
                                />
                            </div>
                            <div className="custom-col">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="custom-input"
                                    required
                                />
                            </div>
                            <div className="custom-col">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="custom-input"
                                    required
                                />
                            </div>
                            <div className="custom-col">
                                <label htmlFor="Confirm_Password">Confirm Password</label>
                                <input
                                    type="password"
                                    id="Confirm_Password"
                                    name="Confirm_Password"
                                    placeholder="Confirm Password"
                                    value={formData.Confirm_Password}
                                    onChange={handleChange}
                                    className="custom-input"
                                    required
                                />
                            </div>
                            <div className="custom-col">
                                <label htmlFor="secretKey">Secret Key</label>
                                <input
                                    type="password"
                                    id="secretKey"
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