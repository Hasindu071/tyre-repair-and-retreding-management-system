import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import background from '../assets/background.png';
import Navbar from '../components/NavBar';
import '../styles/HomePage.css';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <header 
        className="hero-section d-flex align-items-center text-center text-md-start"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="overlay"></div>
        <div className="container">
          <div className="row align-items-center">
            
            {/* Left Side - Hero Text */}
            <div className="col-md-6">
              <h1 className="hero-title">Trusted Tire Repair & Retreading Experts</h1>
              <p className="hero-subtitle">
                Providing high-quality and reliable services for all your tire needs.
              </p>
            </div>

            {/* Right Side - Register Card */}
            <div className="col-md-6 d-flex justify-content-md-end">
              <div className="register-card-home">
                <h2>Join Us Today</h2>
                <p>Become a part of our trusted team.</p>
                <button className="btn btn-dark btn-lg rounded-pill" onClick={() => navigate("/RoleRegisterSelection")}>
                  Register Now
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
