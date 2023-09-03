import "../styles/homepage.css";
import React from "react";
import SideMenu from "./SideMenu";
import TopTape from "./TopTape";

function HomePage(){
    return(
        <>
            <div className="mainContainer">
                <SideMenu />
                <div className="contentContainer">
                    <TopTape />
                </div>
            </div>
        </>
    );
}

export default HomePage;