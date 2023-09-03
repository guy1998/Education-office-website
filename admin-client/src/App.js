import React from "react";
import LoginField from "./components/LoginField";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router >
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<LoginField />} />
      </Routes>
    </Router>
  );
}

export default App;
