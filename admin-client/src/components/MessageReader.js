import React from "react";
import "../styles/messagePage.css";

function MessageReader ({message}){
    return(
            message ? (<div className="readingBox">
                <h1>Message goes here</h1>
            </div>) : <div className="messagePlaceHolder"></div>
    );
}

export default MessageReader;