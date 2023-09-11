import "../styles/login.css";
import React, { useState } from "react";
import MyButton from "./MyButton";
import { useSnackbar } from "notistack";
import { login } from "../scirpts/log-in-scripts";

function LoginForm({ otpchecker }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleLogin = event => {
    event.preventDefault();
    login(username, password, otpchecker, {
      add: enqueueSnackbar,
      close: closeSnackbar
    });
  };

  return (
    <form className="loginForm">
      <div className="inputDiv">
        <label htmlFor="username" id="userLabel" />
        <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          onChange={handleUsernameChange}
        />
      </div>
      <div className="inputDiv">
        <label htmlFor="password" id="passLabel" />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          onChange={handlePasswordChange}
        />
      </div>
      <MyButton submitting={handleLogin} />
    </form>
  );
}

export default LoginForm;
