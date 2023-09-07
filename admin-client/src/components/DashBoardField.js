import React, { useEffect } from "react";
import { useState } from "react";
import SideMenu from "./SideMenu";
import "../styles/dashboard.css";
import ContentContainer from "./ContentContainer";
import { useNavigate } from "react-router";

function DashBoardField() {
  const navigator = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("logged") === "false")
      navigator("/", { replace: true });
  }, []);

  const [home, setHome] = useState(true);
  const [complaint, setComplaint] = useState(false);
  const [announcement, setAnnouncement] = useState(false);
  const [news, setNews] = useState(false);
  const [institution, setInstitution] = useState(false);
  const [legislation, setLegislation] = useState(false);
  const [exams, setExams] = useState(false);
  const [olimp, setOlimp] = useState(false);
  const [staff, setStaff] = useState(false);
  const [settings, setSettings] = useState(false);

  const setAllFalse = () => {
    setHome(false);
    setAnnouncement(false);
    setNews(false);
    setComplaint(false);
    setInstitution(false);
    setLegislation(false);
    setExams(false);
    setOlimp(false);
    setSettings(false);
    setStaff(false);
  };

  const switchToHome = () => {
    setAllFalse();
    setHome(true);
  };

  const switchToComplaints = () => {
    setAllFalse();
    setComplaint(true);
  };

  const switchToAnnouncements = () => {
    setAllFalse();
    setAnnouncement(true);
  };

  const switchToNews = () => {
    setAllFalse();
    setNews(true);
  };

  const switchToInstitutions = () => {
    setAllFalse();
    setInstitution(true);
  };

  const switchToLegislation = () => {
    setAllFalse();
    setLegislation(true);
  };

  const switchToExams = () => {
    setAllFalse();
    setExams(true);
  };

  const switchToOlimp = () => {
    setAllFalse();
    setOlimp(true);
  };

  const switchToStaff = () => {
    setAllFalse();
    setStaff(true);
  };

  const switchToSettings = () => {
    setAllFalse();
    setSettings(true);
  };

  return (
    <div className="mainContainer">
      <SideMenu
        tabs={{
          home: home,
          complaint: complaint,
          announcement: announcement,
          news: news,
          institution: institution,
          legislation: legislation,
          exams: exams,
          olimp: olimp,
          staff: staff,
          settings: settings,
        }}
        tabFunctions={{
          switchToHome: switchToHome,
          switchToAnnouncements: switchToAnnouncements,
          switchToComplaints: switchToComplaints,
          switchToNews: switchToNews,
          switchToInstitutions: switchToInstitutions,
          switchToLegislation: switchToLegislation,
          switchToExams: switchToExams,
          switchToOlimp: switchToOlimp,
          switchToStaff: switchToStaff,
          switchToSettings: switchToSettings,
        }}
      />
      <ContentContainer
        tabs={{
          home: home,
          complaint: complaint,
          announcement: announcement,
          news: news,
          institution: institution,
          legislation: legislation,
          exams: exams,
          olimp: olimp,
          staff: staff,
          settings: settings,
        }}
      />
    </div>
  );
}

export default DashBoardField;
