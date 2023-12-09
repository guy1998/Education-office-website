import React from "react";
import "../styles/pageFormatting.css";

function PageTitle({title, style}){
    return(
        <div className="pageTitle jump-in">
            <h1 style={{...style}}>{title}</h1>
            <div className="greyLine"></div>
        </div>
    )
}

export default PageTitle;