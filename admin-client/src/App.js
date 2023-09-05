import React from "react";
import LoginField from "./components/LoginField";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashBoardField from "./components/DashBoardField";

function App() {
  return (
    <Router >
      <Routes>
        <Route path="/home" element={<DashBoardField />} />
        <Route path="/" element={<LoginField />} />
      </Routes>
    </Router>
  );
}

export default App;
