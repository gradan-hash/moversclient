import React from "react";
import "./currentorders.scss";
import Sidebar from "../ProvidersDashboard/Sidebar";

const ClientOrders = () => {
  // Updated orders array with additional 'dateDelivered' and 'currentLocation' fields
  const orders = [
    {
      id: 1,
      drivername: "Alex Johnson",
      service: "Storage",
      destination: "New York",
      price: "$200",
      dateDelivered: "2023-07-15",
      currentLocation: "Philadelphia",
    },
    {
      id: 2,
      drivername: "Mia Wong",
      service: "Transport",
      destination: "San Francisco",
      price: "$350",
      dateDelivered: "2023-07-18",
      currentLocation: "Los Angeles",
    },
    {
      id: 3,
      drivername: "Chris Watanabe",
      service: "Both",
      destination: "Tokyo",
      price: "$500",
      dateDelivered: "2023-07-20",
      currentLocation: "Osaka",
    },
    {
      id: 4,
      drivername: "Laura Brehm",
      service: "Storage",
      destination: "Berlin",
      price: "$150",
      dateDelivered: "2023-07-22",
      currentLocation: "Munich",
    },
    {
      id: 5,
      drivername: "Raj Patel",
      service: "Transport",
      destination: "Mumbai",
      price: "$250",
      dateDelivered: "2023-07-25",
      currentLocation: "New Delhi",
    },
  ];

  return (
    <>
      <Sidebar />
      <div className="currentOrders">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name of the driver</th>
              <th>Service Needed</th>
              <th>Destination Location</th>
              <th>Price for the Trip</th>
              <th>Date Delivered</th>
              <th>Current Location</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.drivername}</td> {/* Fixed to use 'drivername' */}
                <td>{order.service}</td>
                <td>{order.destination}</td> {/* Fixed to use 'destination' */}
                <td>{order.price}</td>
                <td>{order.dateDelivered}</td>
                <td>{order.currentLocation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClientOrders;
