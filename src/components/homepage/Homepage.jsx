import React from "react";
import "./homepage.scss";
import Footer from "../footer/Footer";

// Import images
import truck from "../../assets/trucks.jpeg"; // Path to your hero section image
import movers from "../../assets/movers.jpeg"; // Path to your services section image
import maths from "../../assets/maths.jpeg"; // Path to your quote section image
import locationImage from "../../assets/location.jpeg"; // Path to your location tracking image
import aboutImage from "../../assets/storage.jpeg"; // Path to your about section image

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="hero-section">
        <h1>Welcome to MoversConnector</h1>
        <img src={truck} className="images" alt="Get a Transportation Quote" />
        <p>
          Your reliable partner for hassle-free moving and storage solutions.
        </p>
      </div>
      <div className="services-section">
        <h2>Featured Moving Companies</h2>
        <div className="services-list">
          {/* Example service cards */}
          <div className="service-card">
            <p>Cheap Movers Co.</p>
            <img
              src={truck}
              className="imagesfeatured"
              alt="Get a Transportation Quote"
            />
          </div>
          <div className="service-card">
            <p>Affordable Transports Co.</p>
            <img
              src={truck}
              className="imagesfeatured"
              alt="Get a Transportation Quote"
            />
          </div>
          <div className="service-card">
            <br></br>
            <p>Budget Moves Co.</p>
            <img
              src={truck}
              className="imagesfeatured"
              alt="Get a Transportation Quote"
            />
          </div>
        </div>
      </div>
      <div className="quote-location-section">
        <div>
          <h2>Get a Transportation Quote</h2>

          <img
            src={maths}
            className="mathimage"
            alt="Get a Transportation Quote"
          />
          <p>
            Enter your details to receive a competitive quote for your move.
          </p>
          {/* Quote form will go here */}
        </div>
        <div>
          <h2>Track Current Location of Providers</h2>
          <img
            src={locationImage}
            className="locationimage"
            alt="Get a Transportation Quote"
          />
        </div>
      </div>
      <div className="about-moversconnect">
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
