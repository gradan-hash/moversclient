import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import newRequests from "../../API/Newrequest";
import "./SingleTripComponent.scss"; // Ensure you create appropriate styling
import Sidebarclient from "../Sidebar/Sidebarclient";
import Sidebar from "../ProvidersDashboard/Sidebar";

const SingleOrders = () => {
  const { id } = useParams(); // Get trip ID from URL
  const [tripDetails, setTripDetails] = useState(null);

  const [tripId, settripId] = useState("");

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await newRequests.get(`/singleTrip/${id}`);
        console.log(response.data);

        setTripDetails(response.data);
        // console.log("iddddd",response.data._id);
        settripId(response.data._id);
      } catch (error) {
        console.error("Failed to fetch trip details:", error);
      }
    };

    fetchTripDetails();
  }, [id]);

  // console.log("_id", tripId);
  const navigate = useNavigate();

  const completeOrder = async () => {
    try {
      console.log(tripId);
      const res = await newRequests.post("/updatependingTrip", { tripId });
      console.log(res.data);
      alert("Success");
      // navigate("/ongoingorders");
    } catch (error) {
      console.error(error);
    }
  };

  if (!tripDetails) return <div>Loading...</div>;

  return (
    <>
      <Sidebar />

      <div className="trip-details">
        <h2>Trip Details</h2>
        <div className="details-container">
          <div className="detail-section user-details">
            <h3>User Details</h3>
            <p>
              <strong>Username:</strong> {tripDetails.userdetails.username}
            </p>
            <p>
              <strong>Email:</strong> {tripDetails.userdetails.email}
            </p>
            <p>
              <strong>Phonenumber:</strong>{" "}
              {tripDetails.userdetails.phonenumber}
            </p>
          </div>

          <div className="detail-section provider-details">
            <h3>Provider Details</h3>

            <p>
              <strong>Company:</strong>{" "}
              {tripDetails.providerdetails.companyname}
            </p>
            <p>
              <strong>Company Type:</strong>{" "}
              {tripDetails.providerdetails.companytype}
            </p>

            <p>
              <strong>Phonenumber:</strong>
              {tripDetails.providerdetails.phonenumber}
            </p>
            <p>
              <strong>Location:</strong>
              {tripDetails.providerdetails.location}
            </p>
          </div>

          <div className="detail-section item-details">
            <h3>Item Details</h3>
            <p>
              <img
                src={tripDetails.itemdetails.imageURL}
                alt=""
                className="image"
              />
            </p>
            <p>
              <strong>Car Type:</strong> {tripDetails.itemdetails.cartype}
            </p>
            <p>
              <strong>Service Type:</strong>{" "}
              {tripDetails.itemdetails.serviceType}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {tripDetails.itemdetails.description}
            </p>
            <p>
              <strong>Quotation:</strong> ${tripDetails.itemdetails.quotation}
            </p>
            <p>
              <strong>Location:</strong>{" "}
              {tripDetails.itemdetails.operationLocation}
            </p>
          </div>
        </div>
        <button onSubmit={completeOrder} className="complete-order-btn">
          Comnfirm Order
        </button>
      </div>
    </>
  );
};

export default SingleOrders;
