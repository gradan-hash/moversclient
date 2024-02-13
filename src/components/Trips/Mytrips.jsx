import React, { useState } from "react";
import "./mytrips.scss";
import Sidebarclient from "../Sidebar/Sidebarclient";

const MyTrips = () => {
  const [expandedTripId, setExpandedTripId] = useState(null);

  const trips = [
    {
      id: 1,
      rating: 4.5,
      amount: 200,
      company: "MoveIt",
      from: "New York",
      to: "Boston",
      driverName: "John Doe",
      service: "Moving",
    },
    {
      id: 2,
      rating: 4.7,
      amount: 150,
      company: "QuickStorage",
      from: "San Francisco",
      to: "Los Angeles",
      driverName: "Jane Smith",
      service: "Storage",
    },
    {
      id: 3,
      rating: 4.9,
      amount: 300,
      company: "BothWays",
      from: "Chicago",
      to: "Houston",
      driverName: "Mike Johnson",
      service: "Moving and Storage",
    },
    {
      id: 4,
      rating: 4.4,
      amount: 250,
      company: "StoreSafe",
      from: "Miami",
      to: "Orlando",
      driverName: "Emily Davis",
      service: "Storage",
    },
    {
      id: 5,
      rating: 4.8,
      amount: 220,
      company: "RelocateMe",
      from: "Seattle",
      to: "Portland",
      driverName: "William Brown",
      service: "Moving",
    },
  ];

  const toggleDetails = (id) => {
    setExpandedTripId(expandedTripId === id ? null : id);
  };

  return (
    <>
      <Sidebarclient />

      <div className="my-trips-table">
        <table>
          <thead>
            <tr>
              <th>Rating</th>
              <th>Amount</th>
              <th>Company</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <>
                <tr key={trip.id} onClick={() => toggleDetails(trip.id)}>
                  <td>{trip.rating}</td>
                  <td>${trip.amount}</td>
                  <td>{trip.company}</td>
                  <td>
                    From {trip.from} to {trip.to}
                  </td>
                </tr>
                {expandedTripId === trip.id && (
                  <tr className="trip-details">
                    <td colSpan="4">
                      Driver Name: {trip.driverName}
                      <br />
                      Service Provided: {trip.service}
                      {/* Add other important details here */}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyTrips;
