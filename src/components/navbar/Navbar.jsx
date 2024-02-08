import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";

const Navbar = () => {
  const messageCount = 0; // Assuming this could be dynamic

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MoversConnector
        </Link>
        <div className="nav-menu">
          <Link
            to="/messages"
            style={{ textDecoration: "none" }}
            className="nav-item">
            <div className="message-icon-wrapper">
              <MarkChatUnreadIcon className="messageicon" />
              <span className="message-count">{messageCount}</span>
            </div>
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
