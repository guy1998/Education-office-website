import "../styles/login.css";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { verifyOtp } from "../scirpts/log-in-scripts";

function OtpCheck(){

    const [code, setCode] = useState('');
    const handleCodeChange = (event)=>{
        setCode(event.target.value);
    }
    const navigator = useNavigate();

    return(
        <div className="darkVeil">
            <div className="otpSquare">
                <h4>Kodi i verifikimit</h4>
                <p>Nje kod verifikimi ju eshte derguar ne emailin tuaj. Ju lutem vendoseni per te vazhduar!</p>
                <input onChange={handleCodeChange} type="text" placeholder="xxxxxx" className="otpField" required maxLength={6} minLength={6}></input>
                <button className="loginButton" onClick={()=>{verifyOtp(localStorage.getItem('temporary_id'), code, navigator)}}>Vazhdo</button>
                <p id="errorMessage"></p>
            </div>
        </div>
    )
}

export default OtpCheck;