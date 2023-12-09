import React from "react";
import "../styles/message.css";
import ComplaintForm from "./ComplaintForm.js";
import { useRef, useEffect, useState } from "react";

function MessageDiv() {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="messageDiv" id="messageDiv" ref={ref}>
      <h1 className={isVisible ? "headers jump-in" : "headers"}>Hapësira e qytetarit</h1>
      <div className="innerDiv">
        <ComplaintForm animationClass={isVisible ? 'jump-in' : ''}/>
        <div className="descriptionDiv">
          <h4 className={isVisible ? "headers jump-in" : "headers"}>Ka ardhur koha ta bësh zërin tënd të dëgjohet!</h4>
          <div style={{animationDelay: '1s'}} className={isVisible ? "imageDiv jump-in" : "imageDiv"} />
          <p style={{animationDelay: '1.5s'}} className={isVisible ? "jump-in" : ""}>
            Formuloni tani kërkesën ose ankesën tuaj! Për të tjerat mendojmë ne.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageDiv;
