import React, { useEffect, useState } from "react";
import "./currentorders.scss";
import Sidebar from "../ProvidersDashboard/Sidebar";
import newRequests from "../../API/Newrequest";
import { Link } from "react-router-dom";

const CurrentOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await newRequests.get("/getUnconfirmedTrips");
        console.log(res.data);
        setOrders(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getOrders();
  }, []);

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
              <th>Phonenumber of the Customer</th>
              <th>Price for the Trip</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <Link
                  to={`/orderdetails/${order._id}`}
                  style={{ textDecoration: "none" }}>
                  <td>{order._id}</td>
                </Link>
                <td>{order.userdetails.username}</td>
                <td>{order.itemdetails.serviceType}</td>
                <td>{order.userdetails.phonenumber}</td>
                <td>{order.itemdetails.quotation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CurrentOrders;
