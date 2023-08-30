import "../styles/login.css";
import React, { useState } from "react";
import MyButton from "./MyButton";
const functions = require('../scirpts/log-in-scripts.js');

function LoginForm({otpchecker}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = (event) => {
        event.preventDefault();
        functions.login(username, password, otpchecker);
    }

    return (
        <form className="loginForm">
            <div className="inputDiv">
                <label htmlFor="username" id="userLabel"></label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="username"
                    onChange={handleUsernameChange}
                />
            </div>
            <div className="inputDiv">
                <label htmlFor="password" id="passLabel"></label>
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