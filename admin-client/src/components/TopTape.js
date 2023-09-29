import React, { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { logOut } from "../scirpts/log-in-scripts";
import { useNavigate } from "react-router";

function TopTape() {

  const navigator = useNavigate();
  const [name, setName] = useState(JSON.parse(localStorage.getItem('user')).name);

  useEffect(()=>{
    setName(JSON.parse(localStorage.getItem('user')).name);
  }, [JSON.parse(localStorage.getItem('user')).name])

  return (
    <div className="tape">
      <h5>Pershendetje, {name}</h5>
      <DropdownButton id="topMenuIcon" title="">
        <Dropdown.Item className="topItem" id="action-1" onClick={()=>logOut(navigator)}>C'kycuni</Dropdown.Item>
        <Dropdown.Item className="topItem" id="action-2">Info</Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

export default TopTape;
