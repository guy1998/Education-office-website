import { React, useState } from "react";
import NavBar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import BottomLine from "./components/BottomLine";
import WebsiteCenter from "./components/WebsiteCenter";
import { Helmet } from 'react-helmet';

function App() {
  const [mainField, setMainfield] = useState(true);
  const [institutionField, setInstitutionField] = useState(false);
  const [announcements, setAnnouncements] = useState(false);

  const switchToHome = () => {
    setInstitutionField(false);
    setAnnouncements(false);
    setMainfield(true);
  };

  const switchToInstitutions = () => {
    setMainfield(false);
    setAnnouncements(false);
    setInstitutionField(true);
  };

  const switchToAnnouncements = () => {
    setMainfield(false);
    setInstitutionField(false);
    setAnnouncements(true);
  };

  return (
    <>
      <Helmet>
        <meta http-equiv="X-Frame-Options" content="deny" />
      </Helmet>
      <NavBar
        home={switchToHome}
        institutions={switchToInstitutions}
        announcements={switchToAnnouncements}
      />
      <WebsiteCenter
        mainfield={mainField}
        institutionsField={institutionField}
        announcements={announcements}
      />
      <Footer />
      <BottomLine />
    </>
  );
}

export default App;
