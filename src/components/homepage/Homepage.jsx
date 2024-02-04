import React from "react";
import "./homepage.scss";
import Footer from "../footer/Footer";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="hero-section">
        <h1>Welcome to MoversConnector</h1>
        <p>
          Your reliable partner for hassle-free moving and storage solutions.
        </p>
      </div>
      <div className="services-section">
        <h2>Featured Moving Companies</h2>
        <div className="services-list">
          {/* Example service cards */}
          <div className="service-card">Cheap Movers Co.</div>
          <div className="service-card">Affordable Transports</div>
          <div className="service-card">Budget Friendly Moves</div>
        </div>
      </div>
      <div className="quote-location-section">
        <h2>Get a Transportation Quote</h2>
        <p>Enter your details to receive a competitive quote for your move.</p>
        {/* Quote form will go here */}
        <h2>Track Current Location of Providers</h2>
        {/* Location tracking feature will go here */}
      </div>
      <div className="about-moversconnect">
        <h2>About MoversConnector</h2>
        <p>
          Connecting you with a network of trusted movers and storage providers
          to ensure a smooth, efficient, and secure moving experience.
        </p>
      </div>
      {/* <Footer />; */}
    </div>
  );
};

export default Homepage;
