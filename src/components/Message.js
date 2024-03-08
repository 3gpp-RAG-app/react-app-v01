import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiEndpoints } from '../config/EndPoints';

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
      // User's message
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
  
      <div className='h-full basis-5/7 bg-white bg-opacity-70 rounded-md m-5 overflow-auto'>
        <div className='p-5 font-sans text-lg antialiased'>
          {chatMessages.map((message, index) => (
            <div key={index} className={message.type === 'user' ? 'user-message' : 'server-message'}>
              {message.type === 'user' ? (
                <div className=" bg-white rounded-md p-3 m-3 flex flex-row">
                  <div className='basis-6/7 pl-3'> {message.text}</div>
                </div>
              ) : (
                <div className="bg-white rounded-md p-3 m-3">
                <div>{message.text}</div>
                {message.source && (
                  <div className='pt-4 text-sm italic' onClick={() => handleToggleClick(index)} style={{ cursor: 'pointer' }}>
                    Sources:
                    {message.source.map((retrival, retrivalIndex) => (
                      <div key={retrivalIndex}>
                        {retrival.parentDoc} section {retrival.contentList}
                      </div>
                    ))}
                  </div>
                )}
                {showSourceArray[index] && (
                  <div>
                    {message.source.map((retrival, retrivalIndex) => (
                      <div key={retrivalIndex}>
                        {retrival.text}
                      </div>
                    ))}
                  </div>
                )}
                  {message.source && (
                    <div className='text-sm flex flex-col pt-4'>
                      {responseRatings[index] === undefined && (
                        <React.Fragment>
                          Did this answer your question?
                          <div className='underline  decoration-sky-900 text-sky-900 flex justify-end space-x-20'>
                            <div  className="cursor-pointer" onClick={() => handleRating(index, true)}>Yes</div>
                            <div  className="cursor-pointer" onClick={() => handleRating(index, false)}>No</div>
                          </div>
                        </React.Fragment>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
  
      <div className="basis-1/7 rounded-md m-5 flex items-center justify-between bg-white p-2">
        <div className="flex size-full">
          <input
            type="text"
            id="user_input"
            className="flex-1 border p-2 mr-2 text-lg"
            placeholder="Enter your text here"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button onClick={submitToDatabase} className="rounded-full w-32">
            Send
          </button>
        </div>
      </div>
      <div className='pl-5 pb-3 text-xs'>This Alpha release of the 3gpp chat app </div>
    </div>
  );
}  

export default Message;
