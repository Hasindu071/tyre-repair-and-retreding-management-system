import React from 'react';
import { NavLink } from 'react-router-dom'; // Using NavLink to highlight active page
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../assets/Logo.png'; // Adjust path accordingly
import '../styles/Navbar.css'; // Optional for additional custom styling

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <NavLink className="navbar-brand">
          <img src={Logo} alt="Ryak Tires Logo" style={{ height: '45px' }} />
        </NavLink>
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
              <NavLink className="nav-link" activeClassName="active" exact to="/" style={({ isActive }) => ({ color: isActive ? 'red' : 'black', fontWeight: isActive ? 'bold' : 'normal' })}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/about" style={({ isActive }) => ({ color: isActive ? 'red' : 'black', fontWeight: isActive ? 'bold' : 'normal' })}>About Us</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/contact" style={({ isActive }) => ({ color: isActive ? 'red' : 'black', fontWeight: isActive ? 'bold' : 'normal' })}>Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/HowItWorks" style={({ isActive }) => ({ color: isActive ? 'red' : 'black', fontWeight: isActive ? 'bold' : 'normal' })}>How It Works</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/OurProductsSales" style={({ isActive }) => ({ color: isActive ? 'red' : 'black', fontWeight: isActive ? 'bold' : 'normal' })}>Our Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="btn btn-danger ms-3 px-4 py-2 fw-bold rounded" to="/RoleLoginSelection">Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
