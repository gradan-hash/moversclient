import React from "react";
import "./dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__row dashboard__top">
        <div className="dashboard__rectangle">
          <strong>Current Orders</strong>
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
  );
};

export default Dashboard;
