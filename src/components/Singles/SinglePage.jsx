import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./SinglePage.scss";
import movers from "../../assets/movers.jpeg";
import Sidebarclient from "../Sidebar/Sidebarclient";
import { useParams } from "react-router-dom";
import Requests from "../../API/Providerequest";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ3JhZGFuIiwiYSI6ImNsc2QwOGhybDB3dnQyaW9hZ3l3cXJxbncifQ.2mVTkWGbItvkXiXgd_-vMw";

const SinglePage = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(0); // State to store the distance
  const [time, setTime] = useState(0); // State to store the estimated time
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [loading, setLoading] = useState("");
  const [company, setCompany] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const Getsinglepage = async () => {
      setLoading(true);
      try {
        const res = await Requests.get(`/singleproduct/${id}`);
        console.log(res);
        setCompany(res.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
      setLoading(false);
    };
    Getsinglepage();
  }, []);

  const destination = { lat: -1.286389, lng: 36.817223 }; // Example destination
  const watchIdRef = useRef(null);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const estimateTime = (distance, speed = 10) => distance / speed; // Time in hours, assuming speed in km/h

  const fetchLocationAndUpdateMap = () => {
    if ("geolocation" in navigator) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          const dist = calculateDistance(
            latitude,
            longitude,
            destination.lat,
            destination.lng
          );
          setDistance(dist);
          setTime(estimateTime(dist));
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

  useEffect(() => {
    if (userLocation && !map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [userLocation.lng, userLocation.lat],
        zoom: 14,
      });

      map.current.on("load", () => {
        new mapboxgl.Marker()
          .setLngLat([userLocation.lng, userLocation.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setText("You are here"))
          .addTo(map.current);

        new mapboxgl.Marker({ color: "red" })
          .setLngLat([destination.lng, destination.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setText("Destination"))
          .addTo(map.current);
      });
    }
  }, [userLocation]);

  useEffect(() => {
    fetchLocationAndUpdateMap();
  }, []);

  return (
    <>
      <Sidebarclient />
      <div className="single-page">
        <div className="details-left">
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
            <p className="distance">Distance: {distance.toFixed(2)} km</p>
            <p className="estimated-time">
              Estimated Time: {time.toFixed(2)} hours
            </p>
          </div>
        </div>
        <div className="map-bottom" ref={mapContainer}></div>
        <button onClick={fetchLocationAndUpdateMap}>Connect</button>
      </div>
    </>
  );
};

export default SinglePage;
