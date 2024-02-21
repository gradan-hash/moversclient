import React, { useEffect, useState } from "react";
import "./mytrips.scss";
import Sidebarclient from "../Sidebar/Sidebarclient";
import newRequests from "../../API/Newrequest";

const MyTrips = () => {
  const [expandedTripId, setExpandedTripId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const getTrips = async () => {
      setLoading(true);
      try {
        const res = await newRequests.get("/getAllCompletedTrips");
        setTrips(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getTrips();
  }, []);

  const toggleDetails = (id) => {
    setExpandedTripId(expandedTripId === id ? null : id);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Sidebarclient />
      <div className="my-trips-table">
        <table>
          <thead>
            <tr>
              <th>Rating</th>
              <th>Quotation</th>
              <th>Company</th>
              <th>Operation Location</th>
            </tr>
          </thead>
          <tbody>
            {trips.length > 0 &&
              trips.map((trip) => (
                <React.Fragment key={trip._id}>
                  <tr onClick={() => toggleDetails(trip._id)}>
                    <td>{trip.rating}</td>
                    <td>${trip.itemdetails.quotation}</td>
                    <td>{trip.providerdetails.companyname}</td>
                    <td>{trip.itemdetails.operationLocation}</td>
                  </tr>
                  {expandedTripId === trip._id && (
                    <tr className="trip-details">
                      <td colSpan="4">
                        <p>Car Type: {trip.itemdetails.cartype}</p>
                        <p>Description: {trip.itemdetails.description}</p>
                        <p>User Email: {trip.userdetails.email}</p>
                        <p>Provider Email: {trip.providerdetails.email}</p>
                        {/* You can add more details here */}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyTrips;
