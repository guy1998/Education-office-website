import { React } from "react";
import Footer from "./components/Footer";
import BottomLine from "./components/BottomLine";
import { Helmet } from 'react-helmet';
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InstiutionsPage from "./pages/InstitutionsPage";
import AnnouncementPage from "./pages/AnnouncementPage";
import ExamPage from "./pages/ExamPage";
import LegislationsPage from "./pages/LegislationsPage";
import NewsPage from "./pages/NewsPage";
import OlimpPage from "./pages/OlimpPage";

function App() {

  return (
    <>
      <Helmet>
        <meta http-equiv="X-Frame-Options" content="deny" />
      </Helmet>
      <NavBar />
      <Router >
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/institucione" element={<InstiutionsPage />} />
          <Route path="/lajme/*" element={<NewsPage />} />
          <Route path="/provimet_kombetare" element={<ExamPage />} />
          <Route path="/olimpiada" element={<OlimpPage />} />
          <Route path="/legjislacioni" element={<LegislationsPage />} />
          <Route path="/njoftime" element={<AnnouncementPage />} />
        </Routes>
      </Router>
      <Footer />
      <BottomLine />
    </>
  );
}

export default App;
