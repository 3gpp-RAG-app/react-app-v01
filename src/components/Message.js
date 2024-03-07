import React, { useState } from 'react';
import axios from 'axios';
import { apiEndpoints } from '../config/EndPoints.js';
import OpenAI from "openai";



const Message = () => {

  const openai = new OpenAI({apiKey:process.env.REACT_APP_API_KEY, dangerouslyAllowBrowser: true});
  const [userInput, setUserInput] = useState('');
  //const [serverResponse, setServerResponse] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  
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
      console.log(response)

      async function main() {
        const completion = await openai.chat.completions.create({
          messages: [{ role: "system", content: "sumerize this server response "+ response.data.results.results_text }],
          model: "gpt-3.5-turbo",
        });
      
        console.log(completion.choices[0]);
     
      // Server's response
     //const contentListMessage = { type: 'server', text: response.data.results_content_list };
      //const parentDocMessage = { type: 'server', text: response.data.results_parent_doc };
      const textMessage = { type: 'server', text:completion.choices[0].message.content };

      setChatMessages((prevMessages) => [...prevMessages, textMessage]);
      console.log(chatMessages)

  
    }
      
    main();

    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred. Please try again.");
    }

    setUserInput('');
  };

  return (
    <div>
      <div>
        <div>
          {chatMessages.map((message, index) => (
            <div key={index} className={message.type === 'user' ? 'user-message' : 'server-message'}>
              {message.text}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between bg-purple-600 p-4">
        <label htmlFor="user_input" className="sr-only">User Input:</label>
        <textarea
          id="user_input"
          name="user_input"
          required
          className="flex-1 border p-2 mr-2 text-lg"
          placeholder="Enter your text here"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        ></textarea>
        <button
          onClick={submitToDatabase}
          type="submit"
          className="bg-purple-900 text-white p-3 rounded w-32 flex items-center justify-center"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Message;
