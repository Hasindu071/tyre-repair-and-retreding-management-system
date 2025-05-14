import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useMessageContext } from '../../context/MessageContext';
import { useNotificationContext } from '../../context/NotificationContext';

import Logo from '../../assets/Logo.png';

const Navbar = () => {
  const { unreadCount } = useMessageContext(); // For worker messages
  const { unreadContactCount } = useNotificationContext(); // For contact inquiries
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here (e.g., clear token, redirect)
    navigate('/RoleLoginSelection');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        {/* Logo */}
        <NavLink className="navbar-brand" to="/OwnerDashboard">
          <img src={Logo} alt="Ryak Tires Logo" style={{ height: '45px' }} />
        </NavLink>

        {/* Navbar Toggler */}
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
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/OwnerDashboard"
                style={({ isActive }) => ({
                  color: isActive ? 'red' : 'black',
                  fontWeight: isActive ? 'bold' : 'normal'
                })}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item position-relative">
              <NavLink
                className="nav-link"
                to="/Inquiries"
                style={({ isActive }) => ({
                  color: isActive ? 'red' : 'black',
                  fontWeight: isActive ? 'bold' : 'normal'
                })}
              >
                Inquiries
                {unreadCount > 0 && (
                <span
                  className="position-absolute custom-badge-pos badge rounded-pill bg-danger"
                  style={{
                    fontSize: '0.65rem',
                    padding: '0.25em 0.5em',
                    top: '1px',
                    right: '0px',
                    left: 'auto',
                    transform: 'none'
                  }}
                >
                {unreadCount > 9 ? '9+' : unreadCount}
                </span>
                )}
              </NavLink>
            </li>


            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="/OurProducts"
                style={({ isActive }) => ({
                  color: isActive ? 'red' : 'black',
                  fontWeight: isActive ? 'bold' : 'normal'
                })}
              >
                Our Products
              </NavLink>
            </li>

            <li className="nav-item position-relative mx-2">
              <NavLink
                className="nav-link"
                to="/notification"
                style={({ isActive }) => ({
                  color: isActive ? 'red' : 'black',
                  fontWeight: isActive ? 'bold' : 'normal'
                })}
              >
              <i className="fas fa-bell fa-lg position-relative"></i>
              {unreadContactCount > 0 && (
                <span
                  className="position-absolute custom-badge-pos badge rounded-pill bg-danger"
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.25em 0.5em',
                    top: '1px',
                    right: '0px',
                    left: 'auto',
                    transform: 'none'
                  }}
                >
                  {unreadContactCount > 9 ? '9+' : unreadContactCount}
                </span>
              )}
              </NavLink>
            </li>


            <li className="nav-item">
              <button className="btn btn-danger ms-2 px-4 py-2 fw-bold rounded" onClick={handleLogout}>
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
