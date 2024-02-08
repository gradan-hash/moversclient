import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./SinglePage.scss";
import movers from "../../assets/movers.jpeg";

// Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual Google Maps API key
const googleMapsApiKey = "YOUR_GOOGLE_MAPS_API_KEY";

const containerStyle = {
  width: "100%", // Use full width to make it responsive
  height: "400px", // Adjust the height as needed
};

// Default center of the map if user's location is not available
const defaultCenter = {
  lat: -34.397,
  lng: 150.644,
};

const SinglePage = () => {
  const [location, setLocation] = useState(null);

  const company = {
    name: "Cheap Movers Co.",
    quote: "$200",
    location: "New York",
    vehicleType: "Truck",
    imageUrl: movers,
    description: "Here's how you do it:",
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setLocation({
            lat: coords.latitude,
            lng: coords.longitude,
          });
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    }
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
        <p className="company-description">{company.description}</p>
      </div>
      <button onClick={getCurrentLocation}>Connect</button>
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location || defaultCenter}
          zoom={10}>
          {location && <Marker position={location} />}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default SinglePage;
