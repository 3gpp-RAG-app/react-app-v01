import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex h-full pb-3 bg-[#487792] rounded-md">
      <div className="flex flex-col w-full ">
        <div className="flex items-center justify-center bg-sky-900 p-3 text-white rounded-t-md">
          <span className="text-xl font-semibold">Menu</span>
        </div>
        <nav className="mt-2">
          <Link to="/" className="block p-2 text-xl font-medium text-center text-white hover:bg-sky-900">
            Home
          </Link>
          <Link to="/about" className="block p-2 text-xl font-medium text-center text-white hover:bg-sky-900">
            About
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
