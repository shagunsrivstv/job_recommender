import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import "./index.css"; 
import logo from "./logo.png"; 
import { build } from "joi";

import Navbar from "./Component/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}


export default App;

