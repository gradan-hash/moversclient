import React from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";

const Sidebarclient = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__section sidebar__top">
        <Link className="sidebar__link" to="/">
          <strong>Moving services</strong>
        </Link>
        <Link className="sidebar__link" to="/storage services">
          <strong>Storage services</strong>
        </Link>
      </div>
      <div className="sidebar__section sidebar__center">
        <Link className="sidebar__link" to="/mytrips">
          <strong>My Trips</strong>
        </Link>
        <Link to="/clientongoingorders" className="sidebar__link">
          <strong>Ongoing Orders</strong>
        </Link>
      </div>
      <div className="sidebar__section sidebar__bottom">
        <Link className="sidebar__link" to="/messages">
          <strong>Messages</strong>
        </Link>
      </div>
    </div>
  );
};

export default Sidebarclient;
