import React from "react";
import "../styles/staffCarousel.css";

function StaffCard({staff, animation}) {
  return (
    <div className={"staff-card-container " + animation}>
      <div className="staff-card">
        <div className="staff-front-content">
          <p>{staff.name + " " + staff.surname}</p>
        </div>
        <div className="staff-content">
          <p className="staff-heading">{staff.position}</p>
          <ul className="staff-items">
            <li className="staff-email">{staff.email}</li>
            <li className="staff-phone">{staff.phoneNumber}</li>
          </ul>
          <a href={staff.linkedin} target="_blank" className="staff-linkedin">Linkedin</a> 
        </div>
      </div>
    </div>
  );
}

export default StaffCard;
