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
        const response = await newRequests(
          `/providermessages/${currentUser._id}`
        );
        console.log(response.data);

        // Assuming you want to filter by the uniqueId of the first message
        // Check if there are any messages and get the uniqueId of the first message
        const firstMessageUniqueId =
          response.data.length > 0 ? response.data[0].uniqueid : null;

        // Filter messages to only include those with the same uniqueId as the first message
        const filteredMessages = firstMessageUniqueId
          ? response.data.filter(
              (message) => message.uniqueid === firstMessageUniqueId
            )
          : [];

        setMessages(filteredMessages);
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
            <p>From: {message.sender}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProviderMessage;
