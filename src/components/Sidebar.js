import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="hidden md:flex md:flex-shrink-0 bg-purple-700">
      <div className="flex flex-col w-64 bg-purple-700">
        <div className="flex items-center justify-center h-16 bg-purple-900 text-white">
          <span className="text-xl font-semibold">Menu</span>
        </div>
        <nav className="mt-2">
          <Link to="/" className="block p-2 text-xl font-medium text-center text-white hover:bg-purple-600 w-full">
            Home
          </Link>
          <Link to="/about" className="block p-2 text-xl font-medium text-center text-white hover:bg-purple-600 w-full">
            About
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
