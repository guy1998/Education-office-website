import React from "react";
import "../styles/messagePage.css";

function MessageCard({ message, selecting }) {
  return (
    <div className="messageCard" onClick={()=>selecting(message)}>
      <h6>Mesazh</h6>
      <div className="headerBox">
        <p>
          {message.header}
        </p>
      </div>
      <div className="bottomLineMessage">
        <p>
          <b>Dergoi: </b>
          {message.writer}
        </p>
        <p>
          <b>Data: </b>
          {message.date}
        </p>
      </div>
    </div>
  );
}

export default MessageCard;
