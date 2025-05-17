import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { registerWorker } from "../services/authService";
import Navbar from "../components/NavBar";
import "../styles/WorkerSignup.css";

const WorkerSignup = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const previousFormData = location.state?.formData || {};

    const [signupData, setSignupData] = useState({
        email: "",
        password: "",
        rePassword: ""
    });
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlertMessage("");
        setAlertType("");

        if (!/\S+@\S+\.\S+/.test(signupData.email)) {
            setAlertMessage("Please enter a valid email address!");
            setAlertType("danger");
            return;
        }

        if (signupData.password.length < 6) {
            setAlertMessage("Password must be at least 6 characters long!");
            setAlertType("danger");
            return;
        }

        if (signupData.password !== signupData.rePassword) {
            setAlertMessage("Passwords do not match!");
            setAlertType("danger");
            return;
        }

        const formData = new FormData();
        for (let key in previousFormData) {
            formData.append(key, previousFormData[key]);
        }
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);

        try {
            const data = await registerWorker(formData);
            console.log("Worker registered:", data);
            setAlertMessage("Registration successful!");
            setAlertType("success");
            setTimeout(() => {
                navigate("/login/worker");
            }, 3000);
        } catch (error) {
            console.error("Error registering worker:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setAlertMessage(error.response.data.message);
                setAlertType("danger");
            } else {
                setAlertMessage("Registration failed! Please try again.");
                setAlertType("danger");
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="worker-signup-container">
                <div className="worker-signup-card">
                    <h2 className="worker-signup-title">Worker <span>SignUp</span></h2>
                    {alertMessage && (
                        <div className={`alert alert-${alertType}`} role="alert">
                            {alertMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group-worker">
                            <label htmlFor="email">Email:</label>
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
                        <div className="form-group-worker">
                            <label htmlFor="password">Password:</label>
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
                        <div className="form-group-worker">
                            <label htmlFor="rePassword">Re-enter Password:</label>
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