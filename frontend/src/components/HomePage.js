import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import background from '../assets/background.png'; 
import Navbar from './NavBar';
import '../styles/HomePage.css';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate(); 

  return (
    <div>
      <Navbar />
      <header 
        className="hero-section d-flex align-items-center" 
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="container">
          <div className="row align-items-center">
            
            {/* Left Side Text */}
            <div className="col-md-6 text-white">
              <h1>Your Trusted Tire Repair & <br /> Retreading Experts</h1>
              <p>Providing reliable services for all your tire needs.</p>
            </div>

            {/* Right Side Register Card */}
            <div className="col-md-6 d-flex justify-content-md-end">
              <div className="register-card-home">
                <h3>Join As Accountant</h3>
                <button 
                  className="btn btn-dark btn-lg rounded-pill"
                  onClick={() => navigate("/RoleRegisterSelection")}
                >
                  Register
                </button>
              </div>
            </div>

          </div>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
