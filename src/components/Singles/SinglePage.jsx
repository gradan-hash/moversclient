import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./SinglePage.scss";
import movers from "../../assets/movers.jpeg";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ3JhZGFuIiwiYSI6ImNsc2QwOGhybDB3dnQyaW9hZ3l3cXJxbncifQ.2mVTkWGbItvkXiXgd_-vMw";

const SinglePage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const mapContainer = useRef(null);
  const map = useRef(null);

  const company = {
    name: "Cheap Movers Co.",
    quote: "$200",
    location: "New York",
    vehicleType: "Truck",
    imageUrl: movers,
    description: "Description about the company...",
  };

  const watchIdRef = useRef(null);

  const fetchLocationAndUpdateMap = () => {
    if ("geolocation" in navigator) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          if (map.current) {
            map.current.flyTo({
              center: [longitude, latitude],
              essential: true,
              zoom: 14,
            });
          }
        },
        (error) => {
          console.error("Error obtaining location:", error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  };

  useEffect(() => {
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  console.log(userLocation);
  // Initialize map with user's location
  useEffect(() => {
    if (userLocation && !map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [userLocation.lng, userLocation.lat],
        zoom: 14,
      });

      new mapboxgl.Marker()
        .setLngLat([userLocation.lng, userLocation.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setText("You are here"))
        .addTo(map.current);
    }
  }, [userLocation]);

  // Fetch user location immediately on component mount
  useEffect(() => {
    fetchLocationAndUpdateMap();
  }, []);

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
      <button onClick={fetchLocationAndUpdateMap}>Connect</button>
      <div
        ref={mapContainer}
        className="map-container"
        style={{ height: "300px", width: "100%" }}></div>
    </div>
  );
};

export default SinglePage;
