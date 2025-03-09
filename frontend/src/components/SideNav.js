import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiCheckCircle,
  FiUsers,
  FiUserPlus,
  FiShoppingCart,
  FiBox,
  FiDollarSign,
  FiTrendingUp,
  FiBell,
  FiPackage,
} from "react-icons/fi";
import "../styles/SideNav.css";

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Sidebar Toggle Button */}
      <div className="toggle-btn" onClick={toggleSidebar}>
      </div>

      {/* Sidebar Navigation Links */}
      <ul className="nav-list">
        <NavItem to="/OwnerDashboard" icon={<FiHome />} text="Dashboard" isOpen={isOpen} />
        <NavItem to="/ApproveOrder" icon={<FiCheckCircle />} text="Approve Orders" isOpen={isOpen} />
        <NavItem to="/AssignWorker" icon={<FiUsers />} text="Assign Workers" isOpen={isOpen} />
        <NavItem to="/ApproveWorker" icon={<FiUserPlus />} text="Approve Workers" isOpen={isOpen} />
        <NavItem to="/CustomerHandle" icon={<FiShoppingCart />} text="Handle Customers" isOpen={isOpen} />
        <NavItem to="/OwnerProductInquiries" icon={<FiBox />} text="Product Inquiries" isOpen={isOpen} />
        <NavItem to="/Owner/SeePayment" icon={<FiDollarSign />} text="Worker Payments" isOpen={isOpen} />
        <NavItem to="/Owner/SeeCustomerPayment" icon={<FiDollarSign />} text="Customer Payments" isOpen={isOpen} />
        <NavItem to="/Owner/SendNotice" icon={<FiBell />} text="Customer Notice" isOpen={isOpen} />
        <NavItem to="/Owner/Supplies" icon={<FiPackage />} text="Supplies" isOpen={isOpen} />
        <NavItem to="/Owner/SeeSales" icon={<FiTrendingUp />} text="Sales" isOpen={isOpen} />
        <NavItem to="/Owner/SeeCustomerSales" icon={<FiTrendingUp />} text="Customer Sales" isOpen={isOpen} />
      </ul>
    </div>
  );
};

const NavItem = ({ to, icon, text, isOpen }) => (
  <li className="nav-item">
      <NavLink to={to} className="nav-link-side">
          {({ isActive }) => (
              <>
                  <span className="icon" style={{ color: isActive ? "red" : "inherit" }}>
                      {icon}
                  </span>
                  {isOpen && (
                      <span
                          className="nav-text"
                          style={{
                              fontWeight: isActive ? "bold" : "normal",
                              color: isActive ? "red" : "inherit",
                              backgroundColor: isActive ? "rgba(0, 0, 0, 0.1)" : "transparent",
                          }}
                      >
                          {text}
                      </span>
                  )}
              </>
          )}
      </NavLink>
  </li>
);

export default SideNav;
