import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import background from '../assets/background.png'; 
import Navbar from './NavBar'; // Import the Navbar component
import '../styles/HomePage.css';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate(); // Correctly initialize navigate

  return (
    <div>
      <Navbar />
      <header className="hero-section" style={{ backgroundImage: `url(${background})` }}>
        <div className="container text-center">
          <h1>Your Trusted Tire Repair & <br /> Retreading Experts</h1>
          <p>Providing reliable services for all your tire needs.</p>
        </div>
        <div className="register-card">
          <h3>Join As Accountant</h3>
          <button 
            className="btn btn-dark btn-lg rounded-pill"
            onClick={() => navigate("/RoleRegisterSelection")}
          >
            Register
          </button>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
