import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import newRequests from "../../API/Newrequest";
import "./SingleTripComponent.scss"; // Ensure you create appropriate styling

const SingleTripComponent = () => {
  const { id } = useParams(); // Get trip ID from URL
  const [tripDetails, setTripDetails] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await newRequests.get(`/singleTrip/${id}`);
        setTripDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch trip details:", error);
      }
    };

    fetchTripDetails();
  }, [id]);

  const completeOrder = async () => {
    try {
      // Implement the logic to mark an order as completed
      // Example API call: await newRequests.post(`/completeOrder/${id}`);
      console.log("Order completed");
    } catch (error) {
      console.error("Failed to complete order:", error);
    }
  };

  if (!tripDetails) return <div>Loading...</div>;

  return (
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
          {/* Add more user details here */}
        </div>

        <div className="detail-section provider-details">
          <h3>Provider Details</h3>
          <p>
            <strong>Company:</strong> {tripDetails.providerdetails.companyname}
          </p>
          <p>
            <strong>Service Type:</strong> {tripDetails.itemdetails.serviceType}
          </p>
          {/* Add more provider details here */}
        </div>

        <div className="detail-section item-details">
          <h3>Item Details</h3>
          <p>
            <strong>Description:</strong> {tripDetails.itemdetails.description}
          </p>
          <p>
            <strong>Quotation:</strong> ${tripDetails.itemdetails.quotation}
          </p>
          <p>
            <strong>Location:</strong>{" "}
            {tripDetails.itemdetails.operationLocation}
          </p>
          {/* Add more item details here */}
        </div>
      </div>
      <button onClick={completeOrder} className="complete-order-btn">
        Complete Order
      </button>
      <Link to="/clientorders" className="back-link">
        Back to Orders
      </Link>
    </div>
  );
};

export default SingleTripComponent;
