import React from "react";
import "./ongoingorders.scss";
import Sidebar from "../ProvidersDashboard/Sidebar";

const OngoingOrders = () => {
  const orders = [
    {
      id: 1,
      name: "Samantha Reed",
      service: "Transport",
      serviceProvider: "FastTrans",
      regOrWarehouse: "FT1234",
      estimate: "2 hrs",
      location: "Chicago",
      price: "$300",
    },
    {
      id: 2,
      name: "Liam Smith",
      service: "Storage",
      serviceProvider: "SafeStore",
      regOrWarehouse: "SS456",
      estimate: "30 days",
      location: "Toronto",
      price: "$400",
    },
    {
      id: 3,
      name: "Elena Gilbert",
      service: "Both",
      serviceProvider: "QuickMove",
      regOrWarehouse: "QM789",
      estimate: "1 week",
      location: "Paris",
      price: "$750",
    },
    // Add more orders as needed
  ];

  return (
    <>
      <Sidebar />

      <div className="ongoingOrders">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name of Customer</th>
              <th>Service Needed</th>
              <th>Service Provider</th>
              <th>{`Reg. Number / Warehouse`}</th>
              <th>Estimate Time</th>
              <th>Location</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.service}</td>
                <td>{order.serviceProvider}</td>
                <td>{order.regOrWarehouse}</td>
                <td>{order.estimate}</td>
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

export default OngoingOrders;
