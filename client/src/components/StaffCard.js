import React from "react";
import "../styles/staffCarousel.css";
import { useSnackbar } from "notistack";

function StaffCard({staff, animation}) {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
          <div className="staff-linkedin" onClick={()=>{
            if(staff.linkedin)
              window.open(staff.linkedin, "_blank");
            else{
              enqueueSnackbar("Ky anetar i stafit nuk ndodhet ne LinkedIn.", "info");
              setTimeout(()=>{
                closeSnackbar();
              }, 4000)
            }
          }}>
            Linkedin 
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffCard;
