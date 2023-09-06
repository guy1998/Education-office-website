import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import React from "react";
import {useState} from 'react';
import "../styles/message.css";
import {sendMessage, validateMessage} from '../scripts/messages-scripts.js';

function MessageForm() {

  const [fullName, setFullName] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
    
  const close = event => {
    const content = document.getElementById("messageForm");
    if (!content.contains(event.target)) {
      document.getElementById("layout").style.display = "none";
    }
  };

  return (
    <div id="layout" onClick={close}>
      <div id="messageForm">
        <h4>Shkruaj mesazhin tend</h4>
        <FloatingLabel
          controlId="floatingInput"
          label="Emri i plote"
          className="mb-3"
        >
          <Form.Control type="email" placeholder="name@example.com" onChange={(event)=>setFullName(event.target.value)}/>
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Subjekti"
          className="mb-3"
        >
          <Form.Control type="email" placeholder="name@example.com" onChange={(event)=>setSubject(event.target.value)}/>
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingTextarea"
          label="Pershkrimi"
          className="mb-3"
        >
          <Form.Control as="textarea" placeholder="Leave a comment here" onChange={(event)=>setDescription(event.target.value)}/>
        </FloatingLabel>
        <p id="messageError"></p>
        <button className="button1" onClick={
            ()=>{
                const message = {writer: fullName, header: subject, body: description};
                const validation = validateMessage(message);
                if(validation.result){
                    console.log(message);
                    sendMessage(message);
                    document.getElementById("layout").style.display = "none";
                }else{
                    document.getElementById("messageError").innerHTML = validation.msg;
                }
            }
        }>
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <span>Dergo</span>
        </button>
      </div>
    </div>
  );
}

export default MessageForm;
