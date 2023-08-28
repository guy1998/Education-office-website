import "../styles/login.css";
import React, { useState } from "react";

const verifyOtp = (temp_id, otp)=>{

    fetch('http://localhost:5000/authenticate/otp', {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({temp_id: temp_id, otp: otp})
    }).then(response=>{
        if(response.status === 200){
            console.log("Here we go");
        }else if (response.status === 404){
            alert('Otp has expired');
            window.location.reload();
        }else if(response.status === 401){
            const msg = document.getElementById('errorMessage');
            msg.innerHTML = 'OTP is not correct!';
        }
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
                <p id="errorMessage"></p>
            </div>
        </div>
    )
}

export default OtpCheck;