import React, { useState, useEffect } from "react";
import "./ProviderMessage.scss";
import newRequests from "../../API/Newrequest";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

const ProviderMessage = () => {
  const [conversations, setConversations] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newRequests.get(
          `/providermesages/${currentUser._id}`
        );
        const latestActivities = response.data.map((conversation) => {
          // Assuming each conversation object includes messages and replies arrays
          const allActivities = [
            ...conversation.messages,
            ...conversation.replies,
          ];
          const latestActivity = allActivities.reduce((latest, current) => {
            return new Date(latest.createdAt) > new Date(current.createdAt)
              ? latest
              : current;
          }, allActivities[0]); // Initialize with the first activity as the latest
          return { ...conversation, latestActivity };
        });

        console.log(latestActivities);
        setConversations(latestActivities);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser._id]);

  return (
    <>
      <Sidebar />
      <div className="provider-message">
        {conversations.map((conversation) => (
          <div key={conversation._id} className="message">
            <Link
              to={`/checkmessages/${conversation.uniqueid}`}
              style={{ textDecoration: "none" }}>
              <span>
                Latest Activity:{" "}
                {conversation.latestActivity.message ||
                  conversation.latestActivity.replyMessage}
              </span>
              <p>
                From: {conversation.latestActivity.sender} -{" "}
                {new Date(
                  conversation.latestActivity.createdAt
                ).toLocaleString()}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProviderMessage;
