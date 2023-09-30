import React from "react";
import "../styles/staffCarousel.css";

function StaffCard({staff}) {
  return (
    <div className="staff-card-container">
      <div className="staff-card">
        <div className="staff-front-content">
          <p>{staff}</p>
        </div>
        <div className="staff-content">
          <p className="staff-heading">Card Hover</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipii voluptas ten mollitia
            pariatur odit, ab minus ratione adipisci accusamus vel est excepturi
            laboriosam magnam necessitatibus dignissimos molestias.
          </p>
        </div>
      </div>
    </div>
  );
}

export default StaffCard;
