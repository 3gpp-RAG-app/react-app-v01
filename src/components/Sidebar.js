import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="flex h-full pb-3 bg-[#487792] rounded-md">
      <div className="flex flex-col w-full ">
        <div className="flex items-center justify-center bg-sky-900 p-3 text-white rounded-t-md">
          <Link to="/" className="text-xl font-semibold">3gpp Chat</Link>
        </div>
        <nav className="mt-2">
          <Link to="/user-guide" className="block p-2 text-xl font-medium text-center text-white hover:bg-sky-900">
            User guide
          </Link>
          <Link to="/privacy" className="block p-2 text-xl font-medium text-center text-white hover:bg-sky-900">
            Terms and Privacy
          </Link>
          <Link to="/contact" className="block p-2 text-xl font-medium text-center text-white hover:bg-sky-900">
          Assistance and Feedback
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;