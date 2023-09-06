import React, { useEffect, useState } from "react";
import MessageList from "./MessageList";
import MessageReader from "./MessageReader";
import "../styles/messagePage.css";
import {getMessages} from "../scirpts/messages-scripts.js";

function ComplaintsPage (){

    const [selectedMessage, setSelectedMessage] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        getMessages((data)=>{
            setMessages(data);
        })
    }, []);

    return(
        <>
            <div className="messageMain">
                <MessageReader message={selectedMessage}/>
                <MessageList messages={messages}/>
            </div>
        </>
    );
}

export default ComplaintsPage;