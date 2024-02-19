import React from "react";
import "./dashboard.scss";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <div className="dashboard__row dashboard__top">
          <div className="dashboard__rectangle">
            <Link to="/currentorders" className="links">
              <strong>Current Orders</strong>
            </Link>
          </div>

          <div className="dashboard__rectangle">
            <Link to="/ongoingorders" className="links">
              {" "}
              <strong>Ongoing Orders</strong>
            </Link>
          </div>
        </div>
        <div className="dashboard__row dashboard__bottom">
          <div className="dashboard__rectangle">
            <Link className="links" to="/reports">
              <strong>Reports</strong>
            </Link>
          </div>
          <div className="dashboard__rectangle">
            <Link className="links" to="/messagesproviders">
              <strong>Messages</strong>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
