import React, { useEffect, useState } from "react";
import "./ongoingorders.scss";
import Sidebar from "../ProvidersDashboard/Sidebar";
import newRequests from "../../API/Newrequest";

const OngoingOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOngoinOrders = async () => {
      try {
        const res = await newRequests.get("getAllPendingTrips");
        console.log(res.data);
        setOrders(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getOngoinOrders();
  }, []);

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

              <th>Location</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order._id}</td>
                <td>{order.userdetails.username}</td>
                <td>{order.itemdetails.serviceType}</td>
                <td>{order.providerdetails.companyname}</td>
                <td>{order.itemdetails.cartype}</td>

                <td>{order.itemdetails.operationLocation}</td>
                <td>{order.itemdetails.quotation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OngoingOrders;
