import React, { useEffect, useState } from "react";
import { getUser } from "../scirpts/user-scripts";
import GenerateUser from "./GenerateUser";
import PersonalInfo from "./PersonalInfo";
import {useSnackbar} from 'notistack';

function SettingsPage() {

  const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  const notification = {
    add: (message, variant)=>{
      enqueueSnackbar(message, variant);
    },
    close: closeSnackbar
  }

  return (
    <div className="settingsMain">
      <PersonalInfo notification={notification}/>
      <GenerateUser notification={notification}/>
    </div>
  );
}

export default SettingsPage;
