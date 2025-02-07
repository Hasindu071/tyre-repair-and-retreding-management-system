import React, { useState } from "react";
import Navbar from "./NavBar"; // Assuming you have a Navbar component
import "../styles/MyProfile.css"; // Import the CSS file

const MyProfile = () => {
    // Sample user data (Replace with API data in real implementation)
    const [profile] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        phone: "+1234567890",
        address: "123 Main Street, City, Country",
    });

    return (
        <div>
            <Navbar />
            <div className="profile-container">
                <h2 className="profile-title">My Profile</h2>
                <div className="profile-card">
                    <p><strong>First Name:</strong> {profile.firstName}</p>
                    <p><strong>Last Name:</strong> {profile.lastName}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Phone:</strong> {profile.phone}</p>
                    <p><strong>Address:</strong> {profile.address}</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
