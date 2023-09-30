import React from "react";
import "../styles/staffCarousel.css";
import StaffCarousel from "./StaffCarousel";

function StaffDivision() {
  return (
    <div className="divisionContainer staffDivision">
      <h1>Stafi juaj</h1>
      <blockquote class="zitat1">
        Njerëzit e jashtëzakonshëm kanë dicka të përbashkët: një sens absolut misioni.
        <cite>Zig Ziglar</cite>
      </blockquote>
      <StaffCarousel />
    </div>
  );
}

export default StaffDivision;
