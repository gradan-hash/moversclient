import React, { useState, useEffect } from "react";
import moment from "moment";
import "./message.scss";
import { useParams } from "react-router-dom";
import newRequests from "../../API/Newrequest";
import Sidebarclient from "../Sidebar/Sidebarclient";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [initialMessage, setInitialMessage] = useState("");
  const { id: providerid } = useParams();
  const clientid = JSON.parse(localStorage.getItem("currentUser"))?._id;
  const [uniqueId, setUniqueId] = useState(""); // State to store uniqueId
  const [refresh, setRefresh] = useState(false); // State to trigger useEffect

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

    try {
      const response = await newRequests.post("/postmessage", messagedetails);
      console.log(response.data);
      setUniqueId(response.data.uniqueid); // Save uniqueId for fetching messages
      setInitialMessage("");
      setRefresh(!refresh); // Trigger useEffect to refresh messages
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    if (!uniqueId) return; // Ensure uniqueId is set before fetching messages

    const getmessages = async () => {
      try {
        const res = await newRequests.get(`/getmessage/${uniqueId}`);
        console.log(res.data);
        setMessages(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getmessages();

    const interval = setInterval(() => {
      getmessages(); // Periodically fetch messages for real-time updates
    }, 3000); // Adjust interval as needed

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [uniqueId, refresh]); // Depend on uniqueId and refresh state

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
            <>{message.sender}</>
            <p>{message.message}</p>
            <p className="time-sent">
              {moment(message.createdAt).format("LLLL")}
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

export default Messages;
