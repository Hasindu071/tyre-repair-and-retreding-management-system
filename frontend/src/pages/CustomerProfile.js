import React, { useState, useEffect } from "react";
import CustomerNavbar from "../components/Navbars/CustomerRegiNavBar";
import "../styles/CustomerProfile.css";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const CustomerProfile = () => {
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

    const { user } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return; // Ensure user exists before fetching
            try {
                // Use user.id if the user object contains an "id" property
                const customerId = user.id;  
                const response = await axios.get(`http://localhost:5000/customerProfile/getProfile/${customerId}`);
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching worker profile:", error);
            }
        };

        fetchProfile();
    }, [user]);

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
                    <p><strong>city:</strong> {profile.city}</p>
                    <p><strong>State:</strong> {profile.state}</p>
                </div>
            </div>
        </div>
    );
};

export default CustomerProfile;