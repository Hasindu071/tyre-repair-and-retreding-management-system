import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavBar';
import '../styles/WorkerSignup.css';

const WorkerSignup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const previousFormData = location.state?.formData || {};  // Get previous form data

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

        // Merge both formData and signupData
        const finalData = {
            ...previousFormData,
            email: signupData.email,
            password: signupData.password
        };

        try {
            const response = await axios.post('http://localhost:5000/registerWorker', finalData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Worker registered:', response.data);
            alert('Registration successful!');
            navigate('/login/worker'); // Redirect after success
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
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={signupData.email}
                            onChange={handleChange}
                            className="worker-signup-input"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={signupData.password}
                            onChange={handleChange}
                            className="worker-signup-input"
                            required
                        />
                        <input
                            type="password"
                            name="rePassword"
                            placeholder="Re-enter Password"
                            value={signupData.rePassword}
                            onChange={handleChange}
                            className="worker-signup-input"
                            required
                        />
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