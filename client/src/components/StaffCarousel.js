import React, { useState, useEffect } from "react";
import "../styles/staffCarousel.css";
import StaffCard from "./StaffCard";
import {getStaff} from "../scripts/staff-scripts";

function StaffCarousel({isVisible}) {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [staff, setStaff] = useState([])
  useEffect(()=>{
    getStaff((data)=>setStaff(data));
  }, [])

  const handleClick = direction => {
    const newIndex = currentIndex + direction;

    if (newIndex >= 0 && newIndex <= staff.length - 3) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="carousel-container">
      <button
        id="leftButton"
        onClick={() => handleClick(-1)}
        className={isVisible ? "carousel-button jump-in" : "carousel-button"}
      />
      <div className="carousel">
        {staff
          .slice(currentIndex, currentIndex + 3)
          .map((item, index) =>
            <StaffCard
              staff={item}
              key={index}
              animation={isVisible ? "jump-in" : ""}
            />
          )}
      </div>
      <button
        id="rightButton"
        onClick={() => handleClick(1)}
        className={isVisible ? "carousel-button jump-in" : "carousel-button"}
      />
    </div>
  );
}

export default StaffCarousel;
