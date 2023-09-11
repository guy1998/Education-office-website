import "../styles/button.css";
import React from "react";
import { loading } from "../scirpts/loading-controller";
import Spinner from 'react-bootstrap/Spinner';

function MyButton({ submitting }) {
    return (
        <button className="loginButton" onClick={submitting}>
            {!loading ? 'Log-in' : <Spinner animation="border" variant="warning" />}
        </button>
    )
}

export default MyButton;