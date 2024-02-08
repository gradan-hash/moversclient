import React, { useState } from "react";
import "./dashboard.scss";
import SearchBar from "../searchbar/SearchBar";
import CompanyList from "../CompanyList/CompanyList";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [filter, setFilter] = useState({
    company: "",
    quote: "",
    location: "",
  });

  const handleSearch = (searchFilter) => {
    setFilter(searchFilter);
  };

  return (
    <div className="dashboard">
      <div>
        <br></br>
      </div>
      <div className="headerr">Moving Companies</div>
      <SearchBar onSearch={handleSearch} />

      <CompanyList filter={filter} />
      <div className="separator">Storage Services Companies</div>
      <Link to="/singlestorage"></Link>
      <CompanyList type="storage" filter={filter} />
    </div>
  );
};

export default Dashboard;
