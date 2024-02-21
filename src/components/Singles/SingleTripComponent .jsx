import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import newRequests from "../../API/Newrequest";
import "./SingleTripComponent.scss"; // Ensure you create appropriate styling
import Sidebarclient from "../Sidebar/Sidebarclient";

const SingleTripComponent = () => {
  const { id } = useParams(); // Get trip ID from URL
  const [tripDetails, setTripDetails] = useState(null);
  const [paymentOption, setPaymentOption] = useState("");
  const [tripId, settripId] = useState("");
  const [showRatingPrompt, setShowRatingPrompt] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await newRequests.get(`/singleTrip/${id}`);
        console.log(response.data);

        setTripDetails(response.data);
        settripId(response.data._id);
      } catch (error) {
        console.error("Failed to fetch trip details:", error);
      }
    };

    fetchTripDetails();
  }, [id]);

  const handlePaymentOptionChange = (option) => {
    setPaymentOption(option);
  };

  const completeOrder = async () => {
    setShowRatingPrompt(true); // Show the rating prompt
  };

  // const tripId = tripDetails._id;
  // console.log(tripId);
  const submitdetails = {
    tripId,
    paymentOption,
    rating,
  };
  const navigate = useNavigate();
  // console.log(submitdetails);
  const submitRating = async () => {
    try {
      const res = await newRequests.post("/completeTrip", submitdetails);

      console.log(res.data);
      alert("Order completed. Thank you for your rating!");
      setShowRatingPrompt(false);
      navigate("/mytrips");
    } catch (error) {
      console.error("Failed to submit rating:", error);
    }
  };

  if (!tripDetails) return <div>Loading...</div>;

  return (
    <>
      <Sidebarclient />

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
          <div className="payment-section">
            <h3>Complete Payment</h3>
            <button onClick={() => handlePaymentOptionChange("cash")}>
              Cash
            </button>
            <button onClick={() => handlePaymentOptionChange("mpesa")}>
              M-Pesa
            </button>
            {paymentOption === "mpesa" && (
              <p>You will be prompted, check your phone.</p>
            )}
          </div>
          {showRatingPrompt && (
            <div className="modal-backdrop">
              <div className="rating-modal">
                <button
                  className="close-btn"
                  onClick={() => setShowRatingPrompt(false)}>
                  ×
                </button>
                <h3>Rate Your Experience (1-5):</h3>
                <div className="rating-inputs">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <span
                      key={num}
                      className={`rating-option ${
                        rating >= num ? "selected" : ""
                      }`}
                      onClick={() => setRating(num)}>
                      {num}
                    </span>
                  ))}
                </div>
                <button onClick={submitRating} className="submit-rating-btn">
                  Submit Rating
                </button>
              </div>
            </div>
          )}
        </div>
        <button onClick={completeOrder} className="complete-order-btn">
          Complete Order
        </button>
        <Link to="/clientongoingorders" className="back-link">
          Back to Orders
        </Link>
      </div>
    </>
  );
};

export default SingleTripComponent;
