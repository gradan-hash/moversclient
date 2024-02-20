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
        // Assuming the response data is an array of conversation objects
        const latestClientMessages = response.data.map((conversation) => {
          // Filter out messages sent by the client
          const clientMessages = conversation.messages.filter(
            (msg) =>
              msg.sender !==
              "Provider" /* Adjust this condition based on how providers are identified */
          );
          // Find the latest client message
          const latestClientMessage = clientMessages.reduce(
            (latest, current) => {
              return new Date(latest.createdAt) > new Date(current.createdAt)
                ? latest
                : current;
            },
            clientMessages[0]
          ); // Initialize with the first client message as the latest

          return { ...conversation, latestClientMessage }; // Add the latest client message to the conversation object
        });

        console.log(latestClientMessages);
        setConversations(latestClientMessages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser._id]); // Dependency array to re-fetch if currentUser._id changes

  return (
    <>
      <Sidebar />
      <div className="provider-message">
        {conversations.map((conversation) => (
          <div key={conversation._id} className="message">
            <Link
              to={`/checkmessages/${conversation.uniqueid}`}
              style={{ textDecoration: "none" }}>
              {conversation.latestClientMessage ? (
                <>
                  <span>
                    Latest Message: {conversation.latestClientMessage.message}
                  </span>
                  <p>
                    From: {conversation.latestClientMessage.sender} -{" "}
                    {new Date(
                      conversation.latestClientMessage.createdAt
                    ).toLocaleString()}
                  </p>
                </>
              ) : (
                <span>No messages from client yet.</span>
              )}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProviderMessage;
