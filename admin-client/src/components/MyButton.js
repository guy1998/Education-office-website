import "../styles/button.css";
import React from "react";

function MyButton({ submitting }) {
    return (
        <button className="loginButton" onClick={submitting}>
            Log-in
        </button>
    )
}

export default MyButton;