import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiEndpoints } from '../../config/EndPoints';
import UserInput from './UserInput';
import ChatMessagesContainer from './ChatMessagesContainer';

const Message = () => {
  const [userInput, setUserInput] = useState('');
  const [serverResponse, setServerResponse] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [showSourceArray, setShowSourceArray] = useState([]);
  const [responseRatings, setResponseRatings] = useState({});


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


  const submitToDatabase = async () => {
    if (!userInput) {
      alert("Please enter a valid input");
      return;
    }
  
    try {
     
      const userMessage = { type: 'user', text: userInput };
      setChatMessages((prevMessages) => [...prevMessages, userMessage]);
  
      const response = await axios.post(apiEndpoints.search, { query: userInput });
      setServerResponse(response.data);

      const newMessageIndex = chatMessages.length;
  
      const textMessage = {
        type: 'server',
        text: response.data.augmented_response,
        source: response.data.retrivals
          ? response.data.retrivals.map((ret, index) => ({
              parentDoc: ret.parent_doc,
              contentList: ret.content_list,
              text: ret.text,
              score: ret.score,
              rating: responseRatings[newMessageIndex + index] !== undefined ? responseRatings[newMessageIndex + index] : null,
            }))
          : undefined,
      };
  
      setChatMessages((prevMessages) => [...prevMessages, textMessage]);
      
    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred. Please try again.");
    }
  
    setUserInput('');
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        const uid = sessionStorage.getItem('uid');
        const logs = JSON.stringify(chatMessages);
  
        const formData = new FormData();
        formData.append('uid', uid);
        formData.append('logs', logs);
  
        navigator.sendBeacon(apiEndpoints.logs, formData);
      } catch (error) {
        console.error('Error posting session logs:', error);
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [chatMessages]);


  return (
    <div className='flex h-full flex-col space-y-4 rounded-md border'>
      <div className="basis-1/7 bg-white pl-5 pt-3 pb-3">3gpp Chat V0.1</div>
      <ChatMessagesContainer
        chatMessages={chatMessages}
        handleToggleClick={handleToggleClick}
        showSourceArray={showSourceArray}
        responseRatings={responseRatings}
        handleRating={handleRating}
      />
     
  
      <UserInput userInput={userInput} setUserInput={setUserInput} submitToDatabase={submitToDatabase} />
      <div className='pl-5 pb-3 text-xs'>This Alpha release of the 3gpp chat app </div>
    </div>
  );
}  

export default Message;
