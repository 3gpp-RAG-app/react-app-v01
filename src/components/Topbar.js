import React from 'react';
import { Link } from 'react-router-dom';
import logoimage from './assets/logo.png'

const Topbar = () => {
  return (
    <div>
      <div className="flex items-center p-2 bg-white">
        <div className="flex items-center bg-transparent">
          <img src={logoimage} alt="3GPP Logo" className="h-10 mr-4" />
        </div>
        <nav className="flex space-x-6 p-2 rounded-md ml-4 flex-grow justify-center">
          <Link to="/" className="text-xl font-medium text-black hover:text-gray-700">
            Home
          </Link>
          <Link to="/user-guide" className="text-xl font-medium text-black hover:text-gray-700">
            Guidance
          </Link>
          <Link to="/privacy" className="text-xl font-medium text-black hover:text-gray-700">
            About
          </Link>
          <Link to="/contact" className="text-xl font-medium text-black hover:text-gray-700">
            Contact
          </Link>
        </nav>
      </div>
      <div className="h-2 bg-[#89CFF0]"></div>
    </div>
  );
};

export default Topbar;
