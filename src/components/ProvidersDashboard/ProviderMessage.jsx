import React, { useState, useEffect } from "react";
import "./ProviderMessage.scss";
import newRequests from "../../API/Newrequest";
import Sidebar from "./Sidebar";

const ProviderMessage = () => {
  const [messages, setMessages] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newRequests.get(
          `/providermessages/${currentUser._id}`
        );
        console.log(response.data);

        // Initialize an object to hold the latest message for each uniqueid
        const latestMessagesMap = {};

        // Iterate over each message to populate the map
        response.data.forEach((message) => {
          const uniqueId = message.uniqueid;
          // If this uniqueid is not yet in the map or if this message is newer, update the map
          if (
            !latestMessagesMap[uniqueId] ||
            new Date(message.createdAt) >
              new Date(latestMessagesMap[uniqueId].createdAt)
          ) {
            latestMessagesMap[uniqueId] = message;
          }
        });

        // Convert the map to an array of messages
        const latestMessages = Object.values(latestMessagesMap);

        setMessages(latestMessages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentUser._id]); // Added dependency to re-fetch if the currentUser._id changes

  return (
    <>
      <Sidebar />

      <div>
        {messages.map((message) => (
          <div key={message._id} className="message">
            <p>{message.message}</p>
            <p>
              From: {message.sender} -{" "}
              {new Date(message.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProviderMessage;
