import React, { useEffect, useState } from "react";
import StaffCard from "./StaffCard";
import { getStaff } from "../scirpts/staff-scripts";
import "../styles/staff.css";
import MyModal from "./MyModal";
import AddStaffForm from "./AddStaffForm";
import { useSnackbar } from "notistack";

function StaffPage() {

  const [staff, setStaff] = useState([]);
  const [changed, setChanged] = useState(false);
  const [onAdding, setOnAdding] = useState(false);
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const onChangeNotification = {
    add: (message, variant)=>{
      enqueueSnackbar(message, variant);
      setChanged(true);
    },
    close: closeSnackbar
  }


  useEffect(()=>{
    getStaff((data)=>setStaff(data));
    setChanged(false);
  }, [changed])

  return (
    <div className="staffMain">
      <div className="staffContainer">
        {staff.length ? staff.map(member=>{
          return <StaffCard member={member} notification={onChangeNotification}/>
        }) : <div className="staffPlaceholder"/>}
      </div>
      <button type="button" className="button" onClick={()=>setOnAdding(true)}>
        <span className="button__text">Shto nje anetar te ri</span>
        <span className="button__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke="currentColor"
            height="24"
            fill="none"
            class="svg"
          >
            <line y2="19" y1="5" x2="12" x1="12" />
            <line y2="12" y1="12" x2="19" x1="5" />
          </svg>
        </span>
      </button>
      <MyModal heading="Shto nje anetar te ri" show={onAdding} onHide={()=>setOnAdding(false)}>
        <AddStaffForm notification={onChangeNotification}/>
      </MyModal>
    </div>
  );
}

export default StaffPage;
