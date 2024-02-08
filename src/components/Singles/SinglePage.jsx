import React from "react";
import "./SinglePage.scss";
import movers from "../../assets/movers.jpeg";

const SinglePage = () => {
  const company = {
    name: "Cheap Movers Co.",
    quote: "$200",
    location: "New York",
    vehicleType: "Truck",
    imageUrl: movers,
    description:
      "To set the textDecoration to none in a <Link> component from React Router, you should pass the style object with textDecoration property set to 'none'. Here's how you do it:",
  };

  return (
    <div className="single-page">
      <img
        src={company.imageUrl}
        alt={company.name}
        className="company-image"
      />
      <div className="company-details">
        <h2 className="company-name">{company.name}</h2>
        <p className="company-location">Location: {company.location}</p>
        <p className="company-quote">Quote: {company.quote}</p>
        <p className="company-vehicle-type">
          Vehicle Type: {company.vehicleType}
        </p>
        <p className="company-description">Description:{company.description}</p>
      </div>
      <button>Connect:</button>
    </div>
  );
};

export default SinglePage;
