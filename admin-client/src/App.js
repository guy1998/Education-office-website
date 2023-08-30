import React from "react";
import LoginField from "./components/LoginField";
import TestComponent from "./components/TestComponent";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router >
      <Routes>
        <Route path="/home" element={<TestComponent />} />
        <Route path="/" element={<LoginField />} />
      </Routes>
    </Router>
  );
}

export default App;
