import React, { useState } from "react";
import "./dashboard.scss";
import SearchBar from "../searchbar/SearchBar";
import CompanyList from "../CompanyList/CompanyList";
import { Link } from "react-router-dom";
import StorageList from "../CompanyList/StorageList";
import Sidebarclient from "../Sidebar/Sidebarclient";

const Storageservices = () => {
 

  return (
    <>
      <Sidebarclient />

      <div className="dashboard">
    
    
        <StorageList />
      </div>
    </>
  );
};

export default Storageservices;
