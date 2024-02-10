import React, { useState } from "react";
import moment from "moment";
import "./message.scss";

const Messages = () => {
  // Using an array to track the expanded state of each message
  const [expandedIds, setExpandedIds] = useState([]);

  // Example hardcoded messages
  const messagespro = [
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

  const toggleExpand = (id) => {
    setExpandedIds(
      expandedIds.includes(id)
        ? expandedIds.filter((expandedId) => expandedId !== id)
        : [...expandedIds, id]
    );
  };

  return (
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
          <p className="time-sent">{moment(message.timeSent).format("LLLL")}</p>
          {expandedIds.includes(message.id) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(message.id);
              }}>
              Close
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Messagespro;
