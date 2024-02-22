import React, { useState, useEffect } from "react";
import moment from "moment";
import "./message.scss";
import { useParams } from "react-router-dom";
import newRequests from "../../API/Newrequest";
import Sidebar from "../ProvidersDashboard/Sidebar";

const Messagespro = () => {
  const [conversation, setConversation] = useState({
    messages: [],
    replies: [],
  }); // Adjusted state
  const [initialMessage, setInitialMessage] = useState("");
  const { uniqueid } = useParams();
  const companyname = JSON.parse(
    localStorage.getItem("currentUser")
  )?.companyname;

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!uniqueid) return;

    const getMessages = async () => {
      try {
        const res = await newRequests.get(`/getmessage/${uniqueid}`);
        if (res.data && res.data.length > 0) {
          setConversation(res.data[0]); // Assuming the first object is the conversation
        }
      } catch (error) {
        console.error(error);
      }
    };

    getMessages();

    const interval = setInterval(getMessages, 3000);
    return () => clearInterval(interval);
  }, [uniqueid, refresh]);

  const sendInitialMessage = async () => {
    if (!initialMessage.trim()) return;

    const messagedetails = {
      uniqueid,
      replyMessage: initialMessage,
      sender: companyname,
    };

    try {
      await newRequests.post("/replymessage", messagedetails);
      setInitialMessage("");
      setRefresh(!refresh); // Trigger a refresh to fetch the latest messages and replies
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleInitialMessageChange = (e) => {
    setInitialMessage(e.target.value);
  };

  return (
    <>
      <Sidebar />
      <div className="messages">
        <div className="message">
          {/* Render Messages */}
          {conversation.messages.map((msg, index) => (
            <div key={`msg-${index}`} className="user-message">
              <div>{msg.sender}</div>
              <p>{msg.message}</p>
              <p className="time-sent">
                {moment(msg.createdAt).format("LLLL")}
              </p>
            </div>
          ))}

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

export default Messagespro;
