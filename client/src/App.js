import { React } from "react";
import Footer from "./components/Footer";
import BottomLine from "./components/BottomLine";
import { Helmet } from 'react-helmet';
import NavBar from "./components/NavBar";
import MainImage from "./components/MainImage";
import HomePageCardContainer from "./components/HomePageCardContainer";
import StaffDivision from "./components/StaffDivision";
import AboutUs from "./components/AboutUs";
import Goal from "./components/Goal";
import MessageDiv from "./components/MessageDiv";

function App() {

  return (
    <>
      <Helmet>
        <meta http-equiv="X-Frame-Options" content="deny" />
      </Helmet>
      <NavBar />
      <div className="divisionContainer">
        <MainImage />
        <HomePageCardContainer />
      </div>
      <AboutUs />
      <Goal />
      <StaffDivision />
      <MessageDiv />
      <Footer />
      <BottomLine />
    </>
  );
}

export default App;
