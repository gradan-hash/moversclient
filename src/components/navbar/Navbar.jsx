import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.scss";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import newRequests from "../../API/Newrequest";

const Navbar = () => {
  const messageCount = 0; 
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}"); 
  const [user, setUser] = useState(false); 

  useEffect(() => {
    if (currentUser && !currentUser.companytype) {
      setUser(true);
    }
  }, [currentUser]);

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await newRequests.post("/logout");
      localStorage.setItem("currentUser", null);
      localStorage.removeItem("currentUser");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

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
              <Link to={user ? "/messages/:id" : "//messagesproviders"}>
                <MarkChatUnreadIcon className="messageicon" />
              </Link>
              <span className="message-count">{messageCount}</span>
            </div>
          </Link>

          {currentUser ? (
            <Link onClick={handleLogout} className="nav-item">
              Logout
            </Link>
          ) : (
            <>
              <Link to="/login" className="nav-item">
                Login
              </Link>
              <Link to="/register" className="nav-item">
                Register
              </Link>
            </>
          )}

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
