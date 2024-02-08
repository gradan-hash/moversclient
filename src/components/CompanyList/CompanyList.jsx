import React from "react";
import "./companyList.scss";
import SearchBar from "../searchbar/SearchBar";
import movers from "../../assets/movers.jpeg";
import location from "../../assets/location.jpeg";
import maths from "../../assets/maths.jpeg";
import truck from "../../assets/trucks.jpeg";
import { Link } from "react-router-dom";
const CompanyList = ({ filter }) => {
  const companies = [
    {
      name: "Cheap Movers Co.",
      quote: "$1200",
      location: "New York",
      vehicleType: "Truck",
      imageUrl: movers, // Add your image path here
    },
    {
      name: "Cheap Movers Co.",
      quote: "$200",
      location: "New York",
      vehicleType: "Truck",
      imageUrl: location, // Add your image path here
    },
    {
      name: "Cheap Movers Co.",
      quote: "$200",
      location: "New York",
      vehicleType: "Truck",
      imageUrl: maths,
    },
    {
      name: "Cheap Movers Co.",
      quote: "$200",
      location: "New York",
      vehicleType: "Truck",
      imageUrl: truck, // Add your image path here
    },
  ];

  const filteredCompanies = companies.filter((company) => {
    const matchesCompany = company.name
      .toLowerCase()
      .includes(filter.company.toLowerCase());
    const matchesQuote = company.quote
      .toLowerCase()
      .includes(filter.quote.toLowerCase());
    const matchesLocation = company.location
      .toLowerCase()
      .includes(filter.location.toLowerCase());
    return matchesCompany && matchesQuote && matchesLocation;
  });

  return (
    <div className="company-list">
      {filteredCompanies.map((company, index) => (
        <div key={index} className="company-card">
          <img
            src={company.imageUrl}
            alt={company.name}
            className="company-image"
          />
          <Link to="/singlepage" style={{textDecoration: "none" }}>
            <div className="company-info">
              <h3>{company.name}</h3>
              <p>Quote: {company.quote}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CompanyList;
