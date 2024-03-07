import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import About from "./components/About";
import Message from "./components/Message";
import Privacy from "./components/Privacy";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen bg-[#85A4B6] bg-opacity-50">
        <div className="w-1/5 p-4">
          <Sidebar />
        </div>
        <div className="w-4/5 p-4 ">
          <Message />
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </Router>
  );
};

export default App;
