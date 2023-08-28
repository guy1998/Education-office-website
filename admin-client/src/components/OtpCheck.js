import "../styles/login.css";
import React, { useState } from "react";

const verifyOtp = (temp_id, otp)=>{

    fetch('http://localhost:5000/authenticate/otp', {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({temp_id: temp_id, otp: otp})
    }).then(response=>{
        if(response.status === 200)
            console.log("Here we go");
        else
            console.log("No sir we did not go!");
    })

}

function OtpCheck(){

    const [code, setCode] = useState('');
    const handleCodeChange = (event)=>{
        setCode(event.target.value);
    }

    return(
        <div className="darkVeil">
            <div className="otpSquare">
                <h4>Kodi i verifikimit</h4>
                <p>Nje kod verifikimi ju eshte derguar ne emailin tuaj. Ju lutem vendoseni per te vazhduar!</p>
                <input onChange={handleCodeChange} type="text" placeholder="xxxxxx" className="otpField" required maxLength={6} minLength={6}></input>
                <button className="loginButton" onClick={()=>{verifyOtp(localStorage.getItem('temporary_id'), code)}}>Vazhdo</button>
            </div>
        </div>
    )
}

export default OtpCheck;