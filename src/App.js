import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import Home from './components/Home';
import About from './components/About';
import Message from './components/Message';



const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <Message/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;