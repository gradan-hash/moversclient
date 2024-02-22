import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import newRequests from "../../API/Newrequest";
import "./SingleTripComponent.scss"; // Ensure you create appropriate styling
import Sidebarclient from "../Sidebar/Sidebarclient";
import Sidebar from "../ProvidersDashboard/Sidebar";

const CompletedSingleReport = () => {
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
              <strong>Username: {tripDetails.userdetails.username}</strong>
            </p>
            <p>
              <strong>Email: {tripDetails.userdetails.email}</strong>
            </p>
            <p>
              <strong>
                Phonenumber: {tripDetails.userdetails.phonenumber}
              </strong>
            </p>
          </div>

          <div className="detail-section provider-details">
            <h3>Provider Details</h3>

            <p>
              <strong>
                Company: {tripDetails.providerdetails.companyname}
              </strong>
            </p>
            <p>
              <strong>
                Company Type: {tripDetails.providerdetails.companytype}
              </strong>
            </p>

            <p>
              <strong>
                Phonenumber:
                {tripDetails.providerdetails.phonenumber}
              </strong>
            </p>
            <p>
              <strong>
                Location:
                {tripDetails.providerdetails.location}
              </strong>
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
              <strong>Car Type: {tripDetails.itemdetails.cartype}</strong>
            </p>
            <p>
              <strong>
                Service Type: {tripDetails.itemdetails.serviceType}
              </strong>
            </p>
            <p>
              <strong>
                Description: {tripDetails.itemdetails.description}
              </strong>
            </p>
            <p>
              <strong>Quotation: ${tripDetails.itemdetails.quotation}</strong>
            </p>
            <p>
              <strong>
                Location: {tripDetails.itemdetails.operationLocation}
              </strong>
            </p>
            <p>
              <strong>Status:{tripDetails.status}</strong>
            </p>
            <p>
              <strong>Rating:{tripDetails.rating}</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompletedSingleReport;
