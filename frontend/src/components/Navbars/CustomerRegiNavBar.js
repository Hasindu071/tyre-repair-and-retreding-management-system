import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../assets/Logo.png';
import { getNotices } from '../../services/NotificationService'; 
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const Navbar = () => {
  const navigate = useNavigate();
  const [hasUnread, setHasUnread] = useState(false);
  const { logout } = useAuth();

  // Fetch notices to check for unread
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getNotices();
        setHasUnread(data.some(notice => !notice.read));
      } catch (error) {
        setHasUnread(false);
      }
    };
    fetchNotices();
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
      background: '#203a43',
      color: 'white'
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate('/login/customer');
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/CustomerDashboard">
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
              <NavLink className="nav-link" to="/CustomerDashboard" style={({ isActive }) => ({ color: isActive ? 'red' : 'black', fontWeight: isActive ? 'bold' : 'normal' })}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Customer/Profile" style={({ isActive }) => ({ color: isActive ? 'red' : 'black', fontWeight: isActive ? 'bold' : 'normal' })}>
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services" style={({ isActive }) => ({ color: isActive ? 'red' : 'black', fontWeight: isActive ? 'bold' : 'normal' })}>
                Your Services
              </NavLink>
            </li>
            <li className="nav-item position-relative">
              <NavLink className="nav-link" to="/notice" style={({ isActive }) => ({ color: isActive ? 'red' : 'black', fontWeight: isActive ? 'bold' : 'normal' })}>
                Notices
                {hasUnread && (
                  <span
                    className="position-absolute"
                    style={{
                      top: '8px',
                      right: '10px',
                      width: '10px',
                      height: '10px',
                      background: '#e74c3c',
                      borderRadius: '50%',
                      display: 'inline-block'
                    }}
                    title="New notice"
                  ></span>
                )}
              </NavLink>
            </li>
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