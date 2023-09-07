import React from "react";
import "../styles/messagePage.css";
import MessageCard from "./MessageCard";

function MessageList({ messages, selecting }) {
  return (
    <div className="messageList">
      {!messages ? (<p style={{margin: "auto"}}>No messages</p>) : (messages.map(message => {
        return (<MessageCard message={message} selecting={selecting}/>)
      }))}
    </div>
  );
}

export default MessageList;
