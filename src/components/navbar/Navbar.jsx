import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss"
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MoversConnector
        </Link>
        <div className="nav-menu">
          <Link to="/about" className="nav-item">
            About
          </Link>
          <Link to="/contact" className="nav-item">
            Contact
          </Link>
          <Link to="/login" className="nav-item">
            Login
          </Link>
          <Link to="/register" className="nav-item">
            Register
          </Link>
          <div className="search-bar">
            <input type="text" placeholder="Search services..." />
            <button type="submit">Search</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
