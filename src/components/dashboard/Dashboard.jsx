import React, { useState } from "react";
import "./dashboard.scss";
import SearchBar from "../searchbar/SearchBar";
import CompanyList from "../CompanyList/CompanyList";
// Assume these components exist and handle specific functionalities

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
      <div>search io?</div>
      <CompanyList filter={filter} />
      <SearchBar onSearch={handleSearch} />
    </div>
  );
};

export default Dashboard;
