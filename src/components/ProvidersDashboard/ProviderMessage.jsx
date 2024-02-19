import React, { useState, useEffect } from "react";
import "./ProviderMessage.scss";
import newRequests from "../../API/Newrequest";
import Sidebar from "./Sidebar";

const ProviderMessage = () => {
  const [messages, setMessages] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  console.log(currentUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newRequests(
          `/providermesages/${currentUser._id}`
        );
        console.log(response.data);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
