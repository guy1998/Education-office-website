import React from "react";
import MainImage from "../components/MainImage";
import HomePageCardContainer from "../components/HomePageCardContainer";
import StaffDivision from "../components/StaffDivision";
import AboutUs from "../components/AboutUs";
import Goal from "../components/Goal";
import MessageDiv from "../components/MessageDiv";

function HomePage() {
    return (
        <>
            <div className="divisionContainer">
                <MainImage />
                <HomePageCardContainer />
            </div>
            <AboutUs />
            <Goal />
            <StaffDivision />
            <MessageDiv />
        </>
    )
}

export default HomePage;