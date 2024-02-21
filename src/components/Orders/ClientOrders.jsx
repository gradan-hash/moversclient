import React, { useEffect, useState } from "react";
import "./currentorders.scss";
import Sidebarclient from "../Sidebar/Sidebarclient";
import newRequests from "../../API/Newrequest";
import { Link } from "react-router-dom";

const ClientOrders = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await newRequests.get("/getAllTrips");
        setTrips(res.data); // Set the fetched trips data to the state
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  return (
    <>
      <Sidebarclient />
      <div className="currentOrders">
        <table>
          <thead>
            <tr>
              <th>Trip ID</th>
              <th>Provider Company</th>
              <th>Item Service Type</th>
              <th>Item Description</th>
              <th>Quotation</th>
              <th>Operation Location</th>
              <th>Order Date</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip, index) => (
              <tr key={index}>
                <Link
                  to={`/tripdetails/${trip._id}`}
                  style={{ textDecoration: "none" }}>
                  <td className="idd">{trip._id}</td>
                </Link>
                <td>{trip.providerdetails.companyname}</td>

                <td>{trip.itemdetails.serviceType}</td>
                <td>{trip.itemdetails.description}</td>
                <td>${trip.itemdetails.quotation}</td>
                <td>{trip.itemdetails.operationLocation}</td>
                <td>{new Date(trip.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClientOrders;
