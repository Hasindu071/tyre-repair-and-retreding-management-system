import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { registerCustomer } from '../services/CustomerService';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../components/NavBar';
import '../styles/customerSignup.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const CustomerSignup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const previousFormData = location.state?.formData || {};  // Get previous form data

    const [signupData, setSignupData] = useState({
        email: '',
        password: '',
        rePassword: ''
    });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Check for registration success flag passed from CustomerRegister
        if (location.state?.registrationSuccess) {
            toast.success("Registration Successful!");
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic email validation
        if (!/\S+@\S+\.\S+/.test(signupData.email)) {
            toast.error("Please enter a valid email address!");
            return;
        }

        // Password length validation
        if (signupData.password.length < 6) {
            toast.error("Password must be at least 6 characters long!");
            return;
        }

        if (signupData.password !== signupData.rePassword) {
            toast.error("Passwords do not match!");
            return;
        }

        // Merge both previous formData and signupData
        const finalData = {
            ...previousFormData,
            email: signupData.email,
            password: signupData.password
        };

        try {
            const responseData = await registerCustomer(finalData);
            console.log('Customer registered:', responseData);
            toast.success('Registration successful!');
            setSuccessMessage('Registration successful!');
            setTimeout(() => {
                navigate('/login/Customer');
            }, 2000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Registration failed! Please try again.');
            }
        }
    };

    return (
        <div>
            <Navbar />
            <ToastContainer />
            <div className="customer-signup-container">
                <div className="customer-signup-card">
                    <h2 className="customer-signup-title">Customer <span>SignUp</span></h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group-ll">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={signupData.email}
                                onChange={handleChange}
                                className="customer-signup-input-ll"
                                required
                            />
                        </div>
                        <br></br>
                        <div className="form-group-ll">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={signupData.password}
                                onChange={handleChange}
                                className="customer-signup-input-ll"
                                required
                            />
                        </div>
                        <br></br>
                        <div className="form-group-ll">
                            <label htmlFor="rePassword" className="form-label">Re-enter Password:</label>
                            <input
                                type="password"
                                id="rePassword"
                                name="rePassword"
                                placeholder="Re-enter your password"
                                value={signupData.rePassword}
                                onChange={handleChange}
                                className="customer-signup-input-ll"
                                required
                            />
                        </div>
                        <br></br>
                        <button type="submit" className="customer-signup-button">
                            Submit
                        </button>
                    </form>
                    {successMessage && (
                        <p className="success-message" style={{ marginTop: '15px', color: 'green', fontWeight: 'bold' }}>
                            {successMessage}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerSignup;