// ChatApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiEndpoints } from '../../config/EndPoints';
import UserInput from './UserInput';
import ChatMessagesContainer from './ChatMessagesContainer';
import FilterBar from './Filterbar';

const Message = () => {
  const [userInput, setUserInput] = useState('');
  const [serverResponse, setServerResponse] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [showSourceArray, setShowSourceArray] = useState([]);
  const [responseRatings, setResponseRatings] = useState({});
  const [filters, setFilters] = useState({
    specNo: '',
    targetRelease: '',
    meeting: '',
    wgStatus: '',
    tsgStatus: '',
    workItem: '',
    entities: {
      entity1: false,
      entity2: false,
      entity3: false,
    },
  });
  

  const handleToggleClick = (index) => {
    setShowSourceArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = !newArray[index];
      return newArray;
    });
  };

  const handleRating = (index, isPositive) => {
    setResponseRatings((prevRatings) => ({
      ...prevRatings,
      [index]: isPositive,
    }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const submitToDatabase = async () => {
    if (!userInput) {
      alert('Please enter a valid input');
      return;
    }

    try {
      const userMessage = { type: 'user', text: userInput };
      setChatMessages((prevMessages) => [...prevMessages, userMessage]);

      const response = await axios.post(apiEndpoints.search, { query: userInput, filters });
      setServerResponse(response.data);

      const newMessageIndex = chatMessages.length;

      const textMessage = {
        type: 'server',
        text: response.data.augmented_response,
        source: response.data.retrivals
          ? response.data.retrivals.map((ret, index) => ({
              parentDoc: ret.parent_doc,
              contentList: ret.content_list,
              //spec:  ret.spec,
              //cr:  ret.cr_number,
              text: ret.text,
              //summary,
              score: ret.score,
              rating: responseRatings[newMessageIndex + index] !== undefined ? responseRatings[newMessageIndex + index] : null,
            }))
          : undefined,
      };

      setChatMessages((prevMessages) => [...prevMessages, textMessage]);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');

      const dummyMessage = {
        type: 'server',
        text: 'Error occured.',
        source: [
          {
            parentDoc: 'Error Document',
            contentList: ['Error content 1', ' Error content 2'],
            text: 'This is a dummy response due to an error in fetching data.',
            score: 0,
            rating: null,
          },
        ],
      };

      setChatMessages((prevMessages) => [...prevMessages, dummyMessage]);
    }

    setUserInput('');
  };

  useEffect(() => {
    const savedMessages = JSON.parse(sessionStorage.getItem('chatMessages'));
    const savedFilters = JSON.parse(sessionStorage.getItem('filters'));

    if (savedMessages) {
      setChatMessages(savedMessages);
    }

    if (savedFilters) {
      setFilters(savedFilters);
    }

    const handleBeforeUnload = () => {
      try {
        const uid = sessionStorage.getItem('uid');
        const logs = JSON.stringify(chatMessages);

        const formData = new FormData();
        formData.append('uid', uid);
        formData.append('logs', logs);

        navigator.sendBeacon(apiEndpoints.logs, formData);

        sessionStorage.setItem('chatMessages', JSON.stringify(chatMessages));
        sessionStorage.setItem('filters', JSON.stringify(filters));
      } catch (error) {
        console.error('Error posting session logs:', error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); // Add an empty dependency array to ensure this runs only on mount/unmount

  useEffect(() => {
    sessionStorage.setItem('chatMessages', JSON.stringify(chatMessages));
    sessionStorage.setItem('filters', JSON.stringify(filters));
  }, [chatMessages, filters]); // Save to session storage whenever chatMessages or filters change

  return (
    <div className='flex flex-col h-[90vh] rounded-md border'>
      <FilterBar filters={filters} handleFilterChange={handleFilterChange} />
      <div className='flex-1 flex justify-center overflow-hidden'>
        <div className='w-full lg:w-[70%] flex flex-col'>
          <div className='flex-1 overflow-y-auto'>
            <ChatMessagesContainer
              chatMessages={chatMessages}
              handleToggleClick={handleToggleClick}
              showSourceArray={showSourceArray}
              responseRatings={responseRatings}
              handleRating={handleRating}
            />
          </div>
          <UserInput userInput={userInput} setUserInput={setUserInput} submitToDatabase={submitToDatabase} />
        </div>
      </div>
      <div className='pl-5 pb-2 text-xs'>This Alpha release of the 3gpp chat app</div>
    </div>
  );
};

export default Message;
