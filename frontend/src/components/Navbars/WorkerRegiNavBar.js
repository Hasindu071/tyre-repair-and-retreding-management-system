import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Using NavLink for active links
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../assets/Logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    // Add logout functionality here (e.g., clear user session, redirect)
    console.log("User logged out");
    navigate("/login/worker");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        {/* Logo */}
        <NavLink className="navbar-brand" to="/">
          <img src={Logo} alt="Ryak Tires Logo" style={{ height: '45px' }} />
        </NavLink>

        {/* Navbar Toggler for Mobile View */}
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

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Home */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/WorkerDashboard" style={({ isActive }) => ({ color: isActive ? 'red' : 'black', fontWeight: isActive ? 'bold' : 'normal' })}>
                Home
              </NavLink>
            </li>

            {/* Profile */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/Worker/Profile" style={({ isActive }) => ({ color: isActive ? 'red' : 'black', fontWeight: isActive ? 'bold' : 'normal' })}>
                Profile
              </NavLink>
            </li>

            {/* Your Services */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/Worker/Message" style={({ isActive }) => ({ color: isActive ? 'red' : 'black', fontWeight: isActive ? 'bold' : 'normal' })}>
                Massage
              </NavLink>
            </li>

            {/* Logout Button */}
            <li className="nav-item">
              <button className="btn btn-danger ms-3 px-4 py-2 fw-bold rounded" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
