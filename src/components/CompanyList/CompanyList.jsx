import React, { useEffect, useState } from "react";
import "./companyList.scss";
import SearchBar from "../searchbar/SearchBar";
import movers from "../../assets/movers.jpeg";
import location from "../../assets/location.jpeg";
import maths from "../../assets/maths.jpeg";
import truck from "../../assets/trucks.jpeg";
import { Link } from "react-router-dom";
import { RequestPageSharp } from "@mui/icons-material";
const CompanyList = ({ filter }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        loading(true);
        const response = await RequestPageSharp.get("/getproducts");
        setCompanies(response.data);
        setLoading(false);
      } catch (error) {
        loading(true);
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCompanies = companies.filter((company) => {
    const matchesCompany = filter.company
      ? company.name.toLowerCase().includes(filter.company.toLowerCase())
      : true;
    const matchesQuote = filter.quote
      ? company.quote.toLowerCase().includes(filter.quote.toLowerCase())
      : true;
    const matchesLocation = filter.location
      ? company.location.toLowerCase().includes(filter.location.toLowerCase())
      : true;
    return matchesCompany && matchesQuote && matchesLocation;
  });

  return (
    <div className="company-list">
      {loading
        ? "loading...."
        : filteredCompanies.map((company, index) => (
            <div key={index} className="company-card">
              <img
                src={company.imageUrl}
                alt={company.name}
                className="company-image"
              />
              <Link to="/singlepage" style={{ textDecoration: "none" }}>
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
