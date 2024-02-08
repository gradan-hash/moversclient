import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./SinglePage.scss";
import movers from "../../assets/movers.jpeg";

// Set your Mapbox access token here
mapboxgl.accessToken =
  "pk.eyJ1IjoiZ3JhZGFuIiwiYSI6ImNsc2QwOGhybDB3dnQyaW9hZ3l3cXJxbncifQ.2mVTkWGbItvkXiXgd_-vMw";

const SinglePage = () => {
  const [lng, setLng] = useState(-74); // Default longitude
  const [lat, setLat] = useState(40.7); // Default latitude
  const [zoom, setZoom] = useState(9); // Default zoom level

  const company = {
    name: "Cheap Movers Co.",
    quote: "$200",
    location: "New York",
    vehicleType: "Truck",
    imageUrl: movers,
    description:
      "To set the textDecoration to none in a <Link> component from React Router, you should pass the style object with textDecoration property set to 'none'. Here's how you do it:",
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: zoom, // starting zoom
    });

    return () => map.remove(); // Clean up on unmount
  }, []);

  const connectUser = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLng = position.coords.longitude;
        const newLat = position.coords.latitude;
        setLng(newLng);
        setLat(newLat);
        setZoom(14); // Adjust zoom for closer view

        // Assuming you have map as a useRef() to access the Mapbox instance
        map.current.flyTo({
          center: [newLng, newLat],
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });

        // Console log the position to save in the database
        console.log("User Location:", { longitude: newLng, latitude: newLat });

        // Here you would typically update the state or context that holds user location,
        // or directly save this location to your database via an API call
      },
      (error) => {
        console.error("Error obtaining location:", error);
      }
    );
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
      <button onClick={connectUser}>Connect</button>
      <div id="map" style={{ height: "300px", width: "100%" }}></div>
    </div>
  );
};

export default SinglePage;
