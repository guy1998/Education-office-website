import React, { useState } from "react";
import "../styles/staffCarousel.css";
import StaffCard from "./StaffCard";

function StaffCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9"
  ];

  const handleClick = direction => {
    const newIndex = currentIndex + direction;

    if (newIndex >= 0 && newIndex <= items.length - 3) {
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="carousel-container">
      <button id="leftButton" onClick={() => handleClick(-1)} className='carousel-button'></button>
      <div className="carousel">
        {items.slice(currentIndex, currentIndex + 3).map((item, index) =>
          <StaffCard staff={item} key={index}/>
        )}
      </div>
      <button id="rightButton" onClick={() => handleClick(1)} className='carousel-button'></button>
    </div>
  );
}

export default StaffCarousel;
