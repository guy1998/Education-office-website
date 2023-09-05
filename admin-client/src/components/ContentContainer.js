import "../styles/dashboard.css";
import React from "react";
import TopTape from "./TopTape";
import HomePage from "./HomePage";
import ComplaintsPage from "./ComplaintsPage";
import AnnouncementPage from "./AnnouncementPage";
import NewsPage from "./NewsPage";
import InstitutionsPage from "./InstitutionsPage";
import LegislationPage from "./LegislationPage";
import ExamPage from "./ExamPage";
import OlimpPage from "./OlimpPage";
import StaffPage from "./StaffPage";
import SettingsPage from "./SettingsPage";

function ContentContainer({ tabs }) {
  return (
    <div className="contentContainer">
      <TopTape />
      {tabs.home && <HomePage />}
      {tabs.complaint && <ComplaintsPage />}
      {tabs.announcement && <AnnouncementPage />}
      {tabs.news && <NewsPage />}
      {tabs.institution && <InstitutionsPage />}
      {tabs.legislation && <LegislationPage />}
      {tabs.exams && <ExamPage />}
      {tabs.olimp && <OlimpPage />}
      {tabs.staff && <StaffPage />}
      {tabs.settings && <SettingsPage />}
    </div>
  );
}

export default ContentContainer;
