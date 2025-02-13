import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaClipboardCheck, FaUsers, FaUserPlus, FaShoppingCart, FaBox, FaDollarSign, FaBars, FaTimes, FaChartLine } from 'react-icons/fa';
import '../styles/SideNav.css';

const SideNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
            {/* Sidebar Toggle Button */}
            <div className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaTimes className="toggle-icon" /> : <FaBars className="toggle-icon" />}
            </div>

            {/* Sidebar Navigation Links */}
            <ul className="nav-list">
                <NavItem to="/OwnerDashboard" icon={<FaHome />} text="Dashboard" isOpen={isOpen} />
                <NavItem to="/ApproveOrder" icon={<FaClipboardCheck />} text="Approve Orders" isOpen={isOpen} />
                <NavItem to="/AssignWorker" icon={<FaUsers />} text="Assign Workers" isOpen={isOpen} />
                <NavItem to="/ApproveWorker" icon={<FaUserPlus />} text="Approve Workers" isOpen={isOpen} />
                <NavItem to="/CustomerHandle" icon={<FaShoppingCart />} text="Handle Customers" isOpen={isOpen} />
                <NavItem to="/OwnerProductInquiries" icon={<FaBox />} text="Product Inquiries" isOpen={isOpen} />
                <NavItem to="/Owner/SeePayment" icon={<FaDollarSign />} text="Worker Payments" isOpen={isOpen} />
                <NavItem to="/Reports" icon={<FaChartLine />} text="Reports" isOpen={isOpen} />
            </ul>
        </div>
    );
};

// Reusable Sidebar Item Component
const NavItem = ({ to, icon, text, isOpen }) => (
    <li>
        <Link to={to} className="nav-link">
            <span className="icon">{icon}</span>
            {isOpen && <span className="nav-text">{text}</span>}
        </Link>
    </li>
);

export default SideNav;
