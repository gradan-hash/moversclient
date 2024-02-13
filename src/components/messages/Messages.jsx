import React, { useState } from "react";
import moment from "moment";
import "./message.scss";

import Sidebarclient from "../Sidebar/Sidebarclient";

const Messagespro = () => {
  const [expandedIds, setExpandedIds] = useState([]); // Tracks expanded message IDs
  const [replies, setReplies] = useState({}); // Stores replies keyed by message ID

  const messages = [
    {
      id: 1,
      content:
        "This is the first example message that is quite long to demonstrate the expanding functionality when the message is clicked. Click to see more!",
      timeSent: "2024-02-08T14:30:00Z",
    },
    {
      id: 2,
      content:
        "This is the second example message with enough length to require expanding and collapsing. Explore the functionality by clicking!",
      timeSent: "2024-02-08T15:00:00Z",
    },
  ];

  // Toggles the expanded state for a given message ID
  const toggleExpand = (id) => {
    setExpandedIds((currentIds) =>
      currentIds.includes(id)
        ? currentIds.filter((expandedId) => expandedId !== id)
        : [...currentIds, id]
    );
  };

  // Updates the reply for a given message ID
  const handleReplyChange = (id, value) => {
    setReplies((currentReplies) => ({
      ...currentReplies,
      [id]: value,
    }));
  };

  // Sends the reply for a given message ID and prevents expanding/collapsing
  const sendReply = (id, e) => {
    e.stopPropagation(); // Prevents the click from propagating to the message div
    console.log(`Reply to message ${id}: ${replies[id]}`);
    // Implement sending reply logic here
  };

  return (
    <>
      <Sidebarclient />
      <div className="messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${
              expandedIds.includes(message.id) ? "expanded" : ""
            }`}
            onClick={() => toggleExpand(message.id)}>
            <p>
              {expandedIds.includes(message.id)
                ? message.content
                : `${message.content.substring(0, 50)}...`}
            </p>
            <p className="time-sent">
              {moment(message.timeSent).format("LLLL")}
            </p>
            {expandedIds.includes(message.id) && (
              <div className="reply-section">
                <div
                  className="reply-container"
                  onClick={(e) => e.stopPropagation()}>
                  <input
                    type="text"
                    placeholder="Type your reply here..."
                    value={replies[message.id] || ""}
                    onChange={(e) =>
                      handleReplyChange(message.id, e.target.value)
                    }
                  />
                  <button onClick={(e) => sendReply(message.id, e)}>
                    Send
                  </button>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(message.id);
                  }}>
                  Close
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Messagespro;
