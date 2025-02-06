import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../assets/Logo.png'; // Adjust path based on your structure
import '../styles/Navbar.css'; // Optional CSS file for additional styles

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src={Logo} alt="Ryak Tires Logo" style={{ height: '40px' }} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <button className="nav-link active btn btn-link" onClick={() => window.location.href = '/'}>
                Home
              </button>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/how-it-works">
                How It Works
              </a>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger ms-2">Login</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
