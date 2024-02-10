import React from "react";
import "./dashboard.scss";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <>
   

      <div className="dashboard">
        <div className="dashboard__row dashboard__top">
          <div className="dashboard__rectangle">
            <Link to="/currentorders" style={{ textDecoration: "none" }}>
              <strong>Current Orders</strong>
            </Link>
          </div>

          <div className="dashboard__rectangle">
            <strong>Ongoing Orders</strong>
          </div>
        </div>
        <div className="dashboard__row dashboard__bottom">
          <div className="dashboard__rectangle">
            <strong>Reports</strong>
          </div>
          <div className="dashboard__rectangle">
            <strong>Messages</strong>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
