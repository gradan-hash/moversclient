import React, { useState, useEffect } from "react";
import "./ProviderMessage.scss";
import newRequests from "../../API/Newrequest";

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
        setMessages(data.messages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index} className="message">
          <p>{message.text}</p>
          <p>From: {message.sender}</p>
        </div>
      ))}
    </div>
  );
};

export default ProviderMessage;
