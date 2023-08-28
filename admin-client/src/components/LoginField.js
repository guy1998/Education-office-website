import React, { useState } from "react";
import "../styles/login.css";
import LoginForm from "./LoginForm";
import OtpCheck from "./OtpCheck";

function LoginField() {

    const [otpCheck, setOtpCheck] = useState(false);

    const otpChecker = ()=>{
        setOtpCheck(true);
    }

    return (
        <div id="loginBackground">
            {otpCheck && <OtpCheck />}
            <div className="mainLoginField">
                <aside className="photoSide">
                    <h3 id="title">Sistemi  ZVAP</h3>
                    <div id="sticker">
                    </div>
                </aside>
                <aside className="formSide">
                    <div className="welcomeSign">
                        <h5>Miresevini</h5>
                    </div>
                    <h5 className="prompt">Kycuni ne llogarine tuaj</h5>
                    <LoginForm otpchecker={otpChecker}/>
                    <p className="forgot">Harruat fjalekalimin?</p>
                </aside>
            </div>
        </div>
    );
}

export default LoginField;