import React, { useState, useEffect } from "react";
import moment from "moment";
import "./message.scss";
import { useParams } from "react-router-dom";
import newRequests from "../../API/Newrequest";
import Sidebarclient from "../Sidebar/Sidebarclient";

const Messages = () => {
  const [conversation, setConversation] = useState({
    messages: [],
    replies: [],
  }); // Adjust state to include both messages and replies
  const [initialMessage, setInitialMessage] = useState("");
  const { id: providerid } = useParams();
  const clientid = JSON.parse(localStorage.getItem("currentUser"))?._id;
  const username = JSON.parse(localStorage.getItem("currentUser"))?.username;
  const [uniqueId, setUniqueId] = useState("");
  const [refresh, setRefresh] = useState(false);

  const handleInitialMessageChange = (e) => {
    setInitialMessage(e.target.value);
  };

  const sendInitialMessage = async () => {
    if (!initialMessage.trim()) return;

    const messageDetails = {
      clientid,
      providerid,
      message: initialMessage,
      sender: username,
    };

    try {
      const response = await newRequests.post("/postmessage", messageDetails);
      console.log(response.data);
      setUniqueId(response.data.uniqueid); // Assuming this sets up or adds to the ongoing conversation
      setInitialMessage("");
      setRefresh(!refresh);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  useEffect(() => {
    if (!uniqueId) return;

    const getMessages = async () => {
      try {
        const res = await newRequests.get(`/getmessage/${uniqueId}`);
        console.log(res.data);
        // Assuming you're only interested in the first conversation object
        if (res.data && res.data.length > 0) {
          setConversation(res.data[0]); // Set the first object of the array to conversation
        } else {
          console.error(
            "Received empty response or response with no conversation."
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    getMessages();

    const interval = setInterval(() => {
      getMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, [uniqueId, refresh]);

  return (
    <>
      <Sidebarclient />
      <div className="messages">
        <div className="message">
          {conversation.messages.map((msg, index) => (
            <div key={index} className="user-message">
              <div>{msg.sender}</div>
              <p>{msg.message}</p>
              <p className="time-sent">
                {moment(msg.createdAt).format("LLLL")}
              </p>
            </div>
          ))}

          {/* Render Replies */}
          {conversation.replies.map((reply, index) => (
            <div key={`reply-${index}`} className="provider-message">
              <div>{reply.sender}</div>
              <p>{reply.replyMessage}</p>
              <p className="time-sent">
                {moment(reply.createdAt).format("LLLL")}
              </p>
            </div>
          ))}
        </div>
        <div className="start-conversation">
          <input
            type="text"
            placeholder="Reply..."
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
