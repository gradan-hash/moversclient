import React, { useState } from 'react';
import './dashboard.scss';
// Assume these components exist and handle specific functionalities
import SearchBar from './components/SearchBar';
import CompanyList from './components/CompanyList';

const Dashboard = () => {
  const [filter, setFilter] = useState({ company: '', quote: '', location: '' });

  const handleSearch = (searchFilter) => {
    setFilter(searchFilter);
  };

  return (
    <div className="dashboard">
      <SearchBar onSearch={handleSearch} />
      <CompanyList filter={filter} />
    </div>
  );
};

export default Dashboard;
