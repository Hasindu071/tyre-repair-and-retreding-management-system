import React, { useState, useEffect } from "react";
import WorkerNavbar from "../components/Navbars/WorkerRegiNavBar"; // Worker Navbar component
import "../styles/CustomerProfile.css"; // CSS file for styling
import axios from "axios";

const WorkerProfile = () => {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        title: "",
        nic: "",
        phone1: "",
        phone2: "",
        address1: "",
        address2: "",
    });

    const workerId = localStorage.getItem("workerId");

    useEffect(() => {
        fetchProfile();
    }, []);

    // Fetch worker profile using the workerId
    const fetchProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/workerProfile/getWorker/${workerId}`);
            setProfile(response.data);
        } catch (error) {
            console.error("Error fetching worker profile:", error);
        }
    };

    return (
        <div>
            <WorkerNavbar />
            <div className="profile-container">
                <h2 className="profile-title">Worker Profile</h2>
                <div className="profile-card">
                    <p><strong>First Name:</strong> {profile.firstName}</p>
                    <p><strong>Last Name:</strong> {profile.lastName}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Title:</strong> {profile.title}</p>
                    <p><strong>NIC:</strong> {profile.nic}</p>
                    <p><strong>Phone 1:</strong> {profile.phone1}</p>
                    <p><strong>Phone 2:</strong> {profile.phone2}</p>
                    <p><strong>Address Line 1:</strong> {profile.address1}</p>
                    <p><strong>Address Line 2:</strong> {profile.address2}</p>
                </div>
            </div>
        </div>
    );
};

export default WorkerProfile;