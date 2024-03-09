// Message.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiEndpoints } from '../config/EndPoints';

const Message = () => {
  const [userInput, setUserInput] = useState('');
  const [serverResponse, setServerResponse] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [showSourceArray, setShowSourceArray] = useState([]);
  const [isChatbotTyping, setIsChatbotTyping] = useState(false);

  const handleToggleClick = (index) => {
    setShowSourceArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = !newArray[index];
      return newArray;
    });
  };

  const submitToDatabase = async () => {

    const userMessageForAPI = userInput; // change the input to use usermessageforapi instead so input can be cleared
    setUserInput('');
    const textArea = document.getElementById("user_input"); // setting the textarea height back to normal
    textArea.style.height = `50px`;
    
    if (!userMessageForAPI) {
      alert("Please enter a valid input");
      return;
    }

    try {
      const userMessage = { type: 'user', text: userMessageForAPI };
      setChatMessages((prevMessages) => [...prevMessages, userMessage]);

      setIsChatbotTyping(true); // Set typing indicator

      const response = await axios.post(apiEndpoints.search, { query: userMessageForAPI });
      setServerResponse(response.data);

      const textMessage = {
        type: 'server',
        text: response.data.results.augmented_response,
        source: {
          parentDoc: response.data.results.results_parent_doc,
          contentList: response.data.results.results_content_list,
          text: response.data.results.results_text,
        },
      };

      setChatMessages((prevMessages) => [...prevMessages, textMessage]);
    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsChatbotTyping(false); // Clear typing indicator
    }
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
                  <div className='pt-4 text-sm italic' onClick={() => handleToggleClick(index)} style={{ cursor: 'pointer' }}>
                    Source: {message.source.parentDoc} section {message.source.contentList}
                  </div>
                  {showSourceArray[index] && (
                    <div>
                      {message.source.text}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
      </div>
          {isChatbotTyping && <div className="m-6">Chatbot is typing...</div>}

      <div className="basis-1/7 rounded-md m-5 flex items-center justify-between bg-white p-2">
        <div className="flex size-full">
          <textarea
            type="textarea"
            id="user_input"
            className="flex-1 border p-2 mr-2 text-lg"
            placeholder="Enter your text here"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={{height: "50px", minHeight: "50px", maxHeight: "200px"}}
            onInput={() => {
              const textArea = document.getElementById("user_input");
              textArea.style.height = "50px"; // initial height 50px
              const newHeight = Math.max(50, textArea.scrollHeight);
              textArea.style.height = `${newHeight}px`;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !isChatbotTyping) {
                e.preventDefault(); // Prevent default form submission
                submitToDatabase(); // Call submit function
              }
            }}
          />

          
        </div>
        {!isChatbotTyping && <button onClick={submitToDatabase} className="rounded-full w-32">
            Send
          </button>}
      </div>

      <div className='pl-5 pb-3 text-xs'>This Alpha release of the 3gpp chat app </div>
    </div>
  );
};

export default Message;
