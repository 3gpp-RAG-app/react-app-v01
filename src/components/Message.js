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
    <div className='flex h-full flex-col space-y-4 rounded-md border'>
      <div className="basis-1/7 bg-white pl-5 pt-3 pb-3">3gpp Chat V0.1</div>

      <div className='h-full basis-5/7 bg-white bg-opacity-70 rounded-md m-5 '>
        <div>
          {chatMessages.map((message, index) => (
            <div key={index} className={message.type === 'user' ? 'user-message' : 'server-message'}>
              {message.text}
            </div>
          ))}
        </div>
      </div>

      <div className="basis-1/7 rounded-md m-5 flex items-center justify-between bg-white p-2">
        <div className= "flex size-full">

          <div contentEditable="true" type="text" id="user_input"  className="flex-1 border p-2 mr-2 text-lg" placeholder="Enter your text here" value={userInput} onChange={(e) => setUserInput(e.target.value)}></div>

          <button onClick={submitToDatabase}className="bg-sky-900 text-white p-3 rounded-full w-32 flex items-center justify-center">
              Send
          </button>
        </div>
        
      </div>
      <div className='pl-5 pb-3 text-xs'>This Alpha release of the 3gpp chat app </div>
    </div>
  );
};

export default Message;
