import React, { useState } from "react";
import { FaShoppingCart, FaClipboardList, FaMoneyBillAlt, FaChevronDown } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/CustomerSidebar.css";

const CustomerSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Get current location
  const [isOrderMenuOpen, setOrderMenuOpen] = useState(false);

  const toggleOrderMenu = () => {
    setOrderMenuOpen(!isOrderMenuOpen);
  };

  const isActive = (path) => location.pathname === path; // 👈 Compare paths

  return (
    <div className="customer-sidebar">
      <h2 className="sidebar-title">Customer Menu</h2>
      <ul className="sidebar-list">
        <li
          className={isActive("/CustomerDashboard") ? "active" : ""}
          onClick={() => navigate("/CustomerDashboard")}
        >
          <FaShoppingCart className="sidebar-icon" />
          Dashboard
        </li>

        <li className={`has-submenu ${isOrderMenuOpen ? "open" : ""}`} onClick={toggleOrderMenu}>
          <FaShoppingCart className="sidebar-icon" />
          Place Order
          <FaChevronDown className={`chevron-icon ${isOrderMenuOpen ? "open" : ""}`} />
        </li>

        {isOrderMenuOpen && (
          <ul className="submenu">
            <li
              className={isActive("/service/repairing") ? "active" : ""}
              onClick={() => navigate("/service/repairing")}
            >
              Repair
            </li>
            <li
              className={isActive("/service/retreading") ? "active" : ""}
              onClick={() => navigate("/service/retreading")}
            >
              Retreading
            </li>
          </ul>
        )}

        <li
          className={isActive("/MyOrders") ? "active" : ""}
          onClick={() => navigate("/MyOrders")}
        >
          <FaClipboardList className="sidebar-icon" />
          My Orders
        </li>

        <li
          className={isActive("/CustomerSeePaymentBilling") ? "active" : ""}
          onClick={() => navigate("/CustomerSeePaymentBilling")}
        >
          <FaMoneyBillAlt className="sidebar-icon" />
          Payment & Billing
        </li>
      </ul>
    </div>
  );
};

export default CustomerSidebar;
