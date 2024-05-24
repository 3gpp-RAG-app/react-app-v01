// App.js
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TermsAndConditions from './components/TermsAndConditions';
import Message from './components/chatapp/ChatApp';
import ConsentDialog from './components/ConsentDialog';
import { apiEndpoints } from './config/EndPoints';
import axios from 'axios';
import UserGuide from './components/UserGuide';
import ContactInformation from './components/ContactInformation';
import Topbar from './components/Topbar';

const App = () => {
  const [showConsentDialog, setShowConsentDialog] = useState(false);
  const [uid, setUid] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const hasAgreed = localStorage.getItem('hasAgreed');
    setShowConsentDialog(!hasAgreed);
  }, []);

  const handleAgree = () => {
    localStorage.setItem('hasAgreed', 'true');
    setShowConsentDialog(false);
  };

  const fetchUid = useCallback(async () => {
    try {
      const response = await axios.get(apiEndpoints.session);
      const data = response.data;

      sessionStorage.setItem('uid', data.uid);
      setUid(data.uid);
    } catch (error) {
      console.error('Error fetching UID:', error);
    }
  }, []);

  useEffect(() => {
    fetchUid();
  }, [fetchUid]);

  return (
    <Router>
      <div className=" overflow-auto flex flex-col h-screen bg-[#85A4B6] bg-opacity-50 relative">
        <div className="lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-3 text-white bg-sky-900"
          >
            Open Sidebar
          </button>
        </div>
        <div className="hidden lg:block">
          <Topbar />
        </div>
        <div className="flex-1 flex flex-col lg:flex-row">
          {sidebarOpen && <Sidebar onClose={() => setSidebarOpen(false)} />}
          <div className="flex-1 p-3">
            <Routes>
              <Route path="/" element={<Message />} />
              <Route path="/user-guide" element={<UserGuide />} />
              <Route path="/privacy" element={<TermsAndConditions />} />
              <Route path="/contact" element={<ContactInformation />} />
            </Routes>
          </div>
        </div>
      </div>

      {showConsentDialog && (
        <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50">
          <ConsentDialog onAgree={handleAgree} />
        </div>
      )}
    </Router>
  );
};

export default App;
