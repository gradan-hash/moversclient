import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__section sidebar__top">
        <Link className="sidebar__link">Current Orders</Link>
        <Link className="sidebar__link">Ongoing Orders</Link>
      </div>
      <div className="sidebar__section sidebar__center">
        <Link className="sidebar__link">Reports</Link>
        <Link className="sidebar__link">File Upload</Link>
      </div>
      <div className="sidebar__section sidebar__bottom">
        <Link className="sidebar__link">Messages</Link>
      </div>
    </div>
  );
};

export default Sidebar;
