import React, { useEffect, useState } from "react";
import "./companyList.scss";
import { Link } from "react-router-dom";
import Requests from "../../API/Providerequest";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Assuming 8 items per page (2 rows of 4)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await Requests.get("/getproducts");
        // Filter for 'moving' serviceType right after fetching
        const movingCompanies = response.data.filter(
          (company) => company.serviceType.toLowerCase() === "moving"
        );
        setCompanies(movingCompanies);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Continue using currentItems for pagination
  const currentItems = companies.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="company-list">
      {loading
        ? "Loading..."
        : currentItems.map((company) => (
            <div key={company._id} className="company-card">
              <img
                src={company.imageURL}
                alt={company.serviceType}
                className="company-image"
              />
              <Link
                to={`/singlepage/${company._id}`}
                style={{ textDecoration: "none" }}>
                <div className="company-info">
                  <h3>ServiceType: {company.serviceType}</h3>
                  <p>Quote: {company.quotation}</p>
                </div>
              </Link>
            </div>
          ))}
      <div className="pagination">
        {[...Array(Math.ceil(companies.length / itemsPerPage)).keys()].map(
          (number) => (
            <button key={number + 1} onClick={() => paginate(number + 1)}>
              {number + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default CompanyList;
