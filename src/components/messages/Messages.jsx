import React, { useState, useEffect } from "react";
import moment from "moment";
import "./message.scss";
import { useParams } from "react-router-dom";
import newRequests from "../../API/Newrequest";
import Sidebar from "../ProvidersDashboard/Sidebar";
import Sidebarclient from "../Sidebar/Sidebarclient";

const Messagespro = () => {
  const [messages, setMessages] = useState([]);
  const [initialMessage, setInitialMessage] = useState(""); // For initial message input
  const { id: providerid } = useParams();
  const clientid = JSON.parse(localStorage.getItem("currentUser"))?._id;

  const handleInitialMessageChange = (e) => {
    setInitialMessage(e.target.value);
  };

  const sendInitialMessage = async () => {
    if (!initialMessage.trim()) return;

    const messagedetails = {
      clientid,
      providerid,
      message: initialMessage,
      sender: "user",
    };
    console.log(messagedetails);

    try {
      const response = await newRequests.post("/postmessage", messagedetails);
      setMessages(response.data); // Add the new message to the conversation
      setInitialMessage(""); // Clear the input field
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <>
      <Sidebarclient />
      <div className="messages">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`message ${
              message.sender === "user" ? "user-message" : "provider-message"
            }`}>
            <p>{message.content}</p>
            <p className="time-sent">
              {moment(message.timeSent).format("LLLL")}
            </p>
          </div>
        ))}
       
        <div className="start-conversation">
          <input
            type="text"
            placeholder="Start a conversation..."
            value={initialMessage}
            onChange={handleInitialMessageChange}
          />
          <button onClick={sendInitialMessage}>Send</button>
        </div>
      </div>
    </>
  );
};

export default Messagespro;
