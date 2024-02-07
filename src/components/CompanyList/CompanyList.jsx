import React from "react";
import "./companyList.scss";

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
    return company.name.toLowerCase().includes(filter.toLowerCase());
    // Extend this logic to filter by other criteria like quote and location
  });

  return (
    <div className="company-list">
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
