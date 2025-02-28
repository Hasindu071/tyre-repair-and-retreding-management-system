import React, { useState, useEffect } from "react";
import NewNavbar from "../components/Navbars/CustomerRegiNavBar"; // Assuming you have a Navbar component
import "../styles/MyProfile.css"; // Import the CSS file
import axios from 'axios'; // Import axios for HTTP requests

const MyProfile = () => {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get('http://localhost:5000/CustomerProfile/getProfile/16'); // Replace '1' with the actual user ID
            setProfile(response.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    return (
        <div>
            <NewNavbar />
            <div className="profile-container">
                <h2 className="profile-title">My Profile</h2>
                <div className="profile-card">
                    <p><strong>First Name:</strong> {profile.firstName}</p>
                    <p><strong>Last Name:</strong> {profile.lastName}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>NIC:</strong> {profile.nic}</p>
                    <p><strong>Phone 1:</strong> {profile.phone1}</p>
                    <p><strong>Phone 2:</strong> {profile.phone2}</p>
                    <p><strong>house Name:</strong> {profile.houseName}</p>
                    <p><strong>City:</strong> {profile.city}</p>
                    <p><strong>State:</strong> {profile.state}</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;