import "../styles/login.css";
import React, { useState } from "react";
import MyButton from "./MyButton";

const login = async (username, password, otpchecker) => {

    fetch('http://localhost:5000/authenticate/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(response => {
        if (response.status === 200)
            return response.json();
        else if (response.status === 404)
            alert('User does not exist');
        else
            alert('Wrong password');
    }).then(serverData=>{
        if(serverData){
            localStorage.setItem('temporary_id', serverData.temp_id);
            otpchecker();
        }
    })

}

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
        login(username, password, otpchecker);
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