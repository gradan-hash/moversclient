import React from "react";
import "./homepage.scss";
import Footer from "../footer/Footer";

// Import images
import heroImage from "./images/hero-image.jpg"; // Path to your hero section image
import serviceImage from "./images/service-image.jpg"; // Path to your services section image
import quoteImage from "./images/quote-image.jpg"; // Path to your quote section image
import locationImage from "./images/location-image.jpg"; // Path to your location tracking image
import aboutImage from "./images/about-image.jpg"; // Path to your about section image

const Homepage = () => {
  return (
    <div className="homepage">
      <div
        className="hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}>
        <h1>Welcome to MoversConnector</h1>
        <p>
          Your reliable partner for hassle-free moving and storage solutions.
        </p>
      </div>
      <div
        className="services-section"
        style={{ backgroundImage: `url(${serviceImage})` }}>
        <h2>Featured Moving Companies</h2>
        <div className="services-list">
          {/* Example service cards */}
          <div className="service-card">Cheap Movers Co.</div>
          <div className="service-card">Affordable Transports</div>
          <div className="service-card">Budget Friendly Moves</div>
        </div>
      </div>
      <div className="quote-location-section">
        <div style={{ backgroundImage: `url(${quoteImage})` }}>
          <h2>Get a Transportation Quote</h2>
          <p>
            Enter your details to receive a competitive quote for your move.
          </p>
        </div>
        <div style={{ backgroundImage: `url(${locationImage})` }}>
          <h2>Track Current Location of Providers</h2>
        </div>
      </div>
      <div
        className="about-moversconnect"
        style={{ backgroundImage: `url(${aboutImage})` }}>
        <h2>About MoversConnector</h2>
        <p>
          Connecting you with a network of trusted movers and storage providers
          to ensure a smooth, efficient, and secure moving experience.
        </p>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Homepage;
