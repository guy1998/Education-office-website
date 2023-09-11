import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import "../styles/loading.css";

function Loading(){
    return(
        <div className="loadingScreen">
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="warning" />
        </div>
    );
}

export default Loading;