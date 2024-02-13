import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__section sidebar__top">
        <Link className="sidebar__link" to="/currentorders">
          <strong>Current Orders</strong>
        </Link>
        <Link className="sidebar__link" to="/ongoingorders">
          <strong>Ongoing Orders</strong>
        </Link>
      </div>
      <div className="sidebar__section sidebar__center">
        <Link className="sidebar__link" to="/reports">
          <strong>Reports</strong>
        </Link>
        <Link to="/uploaditems" className="sidebar__link">
          <strong>File Upload</strong>
        </Link>
      </div>
      <div className="sidebar__section sidebar__bottom">
        <Link className="sidebar__link" to="/checkmessages">
          <strong>Messages</strong>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
