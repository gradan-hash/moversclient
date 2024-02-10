import React from "react";
import "./currentorders.scss";
import Sidebar from "../ProvidersDashboard/Sidebar";

const CurrentOrders = () => {
  const orders = [
    {
      id: 1,
      name: "Alex Johnson",
      service: "Storage",
      location: "New York",
      price: "$200",
    },
    {
      id: 2,
      name: "Mia Wong",
      service: "Transport",
      location: "San Francisco",
      price: "$350",
    },
    {
      id: 3,
      name: "Chris Watanabe",
      service: "Both",
      location: "Tokyo",
      price: "$500",
    },
    {
      id: 4,
      name: "Laura Brehm",
      service: "Storage",
      location: "Berlin",
      price: "$150",
    },
    {
      id: 5,
      name: "Raj Patel",
      service: "Transport",
      location: "Mumbai",
      price: "$250",
    },
  ];

  return (
    <>
      <Sidebar />
      <div className="currentOrders">
        <table>
          <thead>
            <tr>
              {" "}
              <th>ID</th>
              <th>
                <strong>Name of Customer</strong>
              </th>
              <th>Service Needed</th>
              <th>Location of the Customer</th>
              <th>Price for the Trip</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.service}</td>
                <td>{order.location}</td>
                <td>{order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CurrentOrders;
