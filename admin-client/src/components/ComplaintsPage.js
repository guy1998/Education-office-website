import React, { useEffect, useState } from "react";
import MessageList from "./MessageList";
import MessageReader from "./MessageReader";
import "../styles/messagePage.css";
import { getMessages } from "../scirpts/messages-scripts.js";

function ComplaintsPage() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [deleted, setDeleted] = useState(false);

  useEffect(
    () => {
      getMessages(data => {
        setMessages(data);
        setDeleted(false);
      });
    },
    [deleted]
  );

  return (
    <div className="messageMain">
      <MessageReader
        message={selectedMessage}
        onDelete={() => {
          setDeleted(true);
          setSelectedMessage(null);
        }}
      />
      <MessageList
        messages={messages}
        selecting={message => {
          setSelectedMessage(message);
        }}
      />
    </div>
  );
}

export default ComplaintsPage;
