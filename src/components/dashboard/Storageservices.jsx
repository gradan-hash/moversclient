import React, { useState } from "react";
import "./dashboard.scss";
import SearchBar from "../searchbar/SearchBar";
import CompanyList from "../CompanyList/CompanyList";
import { Link } from "react-router-dom";
import StorageList from "../CompanyList/StorageList";
import Sidebarclient from "../Sidebar/Sidebarclient";

const Storageservices = () => {
  const [filter, setFilter] = useState({
    company: "",
    quote: "",
    location: "",
  });

  const handleSearch = (searchFilter) => {
    setFilter(searchFilter);
  };

  return (
    <>
      <Sidebarclient />

      <div className="dashboard">
        <br></br>

        <SearchBar onSearch={handleSearch} />

        <StorageList filter={filter} />
      </div>
    </>
  );
};

export default Storageservices;