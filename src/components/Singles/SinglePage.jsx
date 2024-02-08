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

  const destination = { lat: -1.286389, lng: 36.817223 }; // Example destination
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
            drawLineAndDestination(latitude, longitude);
          }
        },
        (error) => {
          console.error("Error obtaining location:", error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  };

  const drawLineAndDestination = (latitude, longitude) => {
    if (!map.current) return;

    // Destination Marker
    new mapboxgl.Marker({ color: "red" })
      .setLngLat([destination.lng, destination.lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setText("Destination"))
      .addTo(map.current);

    const coordinates = [
      [longitude, latitude],
      [destination.lng, destination.lat],
    ];

    if (map.current.getSource("route")) {
      // If the source exists, update its data
      map.current.getSource("route").setData({
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coordinates,
        },
      });
    } else {
      // Only add the source and layer if they don't exist
      map.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
        },
      });

      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 8,
        },
      });
    }
  };

  useEffect(() => {
    return () => {
      if (watchIdRef.current) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  // Initialize map with user's location
  useEffect(() => {
    if (userLocation && !map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [userLocation.lng, userLocation.lat], // Ensure these are valid numbers
        zoom: 14,
      });

      // Wait for the map to load before adding the marker
      map.current.on("load", () => {
        // Adding the user location marker
        new mapboxgl.Marker()
          .setLngLat([userLocation.lng, userLocation.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setText("You are here"))
          .addTo(map.current);

        // Ensure the destination marker is added here as well
        new mapboxgl.Marker({ color: "red" })
          .setLngLat([destination.lng, destination.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setText("Destination"))
          .addTo(map.current);

        // If there's a need to draw a line between markers, ensure that happens here as well
      });
    }
  }, [userLocation]); // Dependency array ensures this runs when userLocation updates

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
        style={{ height: "50vh", minHeight: "400px", width: "250%" }}></div>
    </div>
  );
};

export default SinglePage;
