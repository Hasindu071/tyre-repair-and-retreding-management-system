import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavBar';
import '../styles/WorkerSignup.css';

const WorkerSignup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const previousFormData = location.state?.formData || {}; // Contains file object (profilePicture) and other fields

    const [signupData, setSignupData] = useState({
        email: '',
        password: '',
        rePassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (signupData.password !== signupData.rePassword) {
            alert("Passwords do not match!");
            return;
        }

        // Create FormData and append both registration and signup data
        const formData = new FormData();
        // Append worker registration details from previousFormData
        for (let key in previousFormData) {
            formData.append(key, previousFormData[key]);
        }
        // Append email and password from signupData
        formData.append('email', signupData.email);
        formData.append('password', signupData.password);

        try {
            const response = await axios.post('http://localhost:5000/WorkerRegister', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Worker registered:', response.data);
            alert('Registration successful!');
            navigate('/login/worker');
        } catch (error) {
            console.error('Error registering Worker:', error);
            alert('Registration failed! Please try again.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="worker-signup-container">
                <div className="worker-signup-card">
                    <h2 className="worker-signup-title">Worker <span>SignUp</span></h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your email"
                                value={signupData.email}
                                onChange={handleChange}
                                className="worker-signup-input"
                                required
                            />
                        </div>
    
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                value={signupData.password}
                                onChange={handleChange}
                                className="worker-signup-input"
                                required
                            />
                        </div>
    
                        <div className="form-group">
                            <label htmlFor="rePassword">Re-enter Password</label>
                            <input
                                type="password"
                                name="rePassword"
                                id="rePassword"
                                placeholder="Re-enter your password"
                                value={signupData.rePassword}
                                onChange={handleChange}
                                className="worker-signup-input"
                                required
                            />
                        </div>
    
                        <button type="submit" className="worker-signup-button">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WorkerSignup;