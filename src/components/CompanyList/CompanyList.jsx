import React from "react";
import "./companyList.scss";
import SearchBar from "../searchbar/SearchBar";

const CompanyList = ({ filter }) => {
  // Dummy data for example purposes
  const companies = [
    {
      name: "Cheap Movers Co.",
      quote: "$200",
      location: "New York",
      vehicleType: "Truck",
    },
    {
      name: "Affordable Transports",
      quote: "$150",
      location: "California",
      vehicleType: "Small Van",
    },
    {
      name: "Budget Friendly Moves",
      quote: "$250",
      location: "Texas",
      vehicleType: "Car",
    },
  ];

  const filteredCompanies = companies.filter((company) => {
    // Assuming filter has properties like company, quote, and location
    const matchesCompany = company.name
      .toLowerCase()
      .includes(filter.company.toLowerCase());
    const matchesQuote = company.quote
      .toLowerCase()
      .includes(filter.quote.toLowerCase());
    const matchesLocation = company.location
      .toLowerCase()
      .includes(filter.location.toLowerCase());

    // Adjust the logic based on how you want to combine these filters
    return matchesCompany && matchesQuote && matchesLocation;
  });

  return (
    <div className="company-list">
      <SearchBar onSearch={handleSearch} />

      {filteredCompanies.map((company, index) => (
        <div key={index} className="company-card">
          <h3>{company.name}</h3>
          <p>Quote: {company.quote}</p>
          <p>Location: {company.location}</p>
          <p>Vehicle Type: {company.vehicleType}</p>
        </div>
      ))}
    </div>
  );
};

export default CompanyList;
