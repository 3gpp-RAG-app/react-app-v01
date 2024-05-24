// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
      <div className="flex h-full w-64 bg-[#487792] rounded-md shadow-md">
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between bg-sky-900 p-3 text-white rounded-t-md text-xl font-semibold">
            <span>3GPP Chat</span>
            <button onClick={onClose} className="text-white">Close</button>
          </div>
          <nav className="mt-2">
            <Link to="/" onClick={onClose} className="block p-2 text-xl font-medium text-center text-white hover:bg-sky-900">
              Chat
            </Link>
            <Link to="/user-guide" onClick={onClose} className="block p-2 text-xl font-medium text-center text-white hover:bg-sky-900">
              User guide
            </Link>
            <Link to="/privacy" onClick={onClose} className="block p-2 text-xl font-medium text-center text-white hover:bg-sky-900">
              Terms and Privacy
            </Link>
            <Link to="/contact" onClick={onClose} className="block p-2 text-xl font-medium text-center text-white hover:bg-sky-900">
              Assistance and Feedback
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;