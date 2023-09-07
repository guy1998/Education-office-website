import React from "react";
import "../styles/messagePage.css";
import { generatePDF, deleteMessage } from "../scirpts/messages-scripts";

function MessageReader({ message, onDelete }) {
  return message
    ? <div className="readingBox">
        <div className="readerHeader">
          <h4>
            {message.header}
          </h4>
        </div>
        <div className="readerMsgInfo">
          <p className="shortInfo">
            <b>Dergoi: </b>
            {message.writer}
          </p>
          <p className="shortInfo">
            <b>Data: </b>
            {message.date}
          </p>
        </div>
        <div className="readerBody">
          <p>
            {message.body}
          </p>
        </div>
        <div className="readerButtonDiv">
          <button className="pdfbutton" onClick={() => generatePDF(message)}>
            <p>PDF</p>
          </button>
          <button
            className="deleteButton"
            onClick={() => {
              deleteMessage(message);
              onDelete();
            }}
          />
        </div>
      </div>
    : <div className="messagePlaceHolder" />;
}

export default MessageReader;
