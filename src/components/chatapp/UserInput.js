import React, { useRef, useState, useEffect } from 'react';

const UserInput = ({ userInput, setUserInput, submitToDatabase }) => {
  const textareaRef = useRef(null);
  const [isSending, setIsSending] = useState(false);

  const handleInput = (e) => {
    setUserInput(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      
      const maxHeight = 208;
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  const handleSendClick = async () => {
    if (!userInput || isSending) return;

    setIsSending(true);

    try {
      await submitToDatabase();
      setUserInput('');
    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="basis-1/7 rounded-md m-5 flex items-center justify-between bg-white p-2">
      <div className="flex size-full">
        <textarea
          ref={textareaRef}
          type="text"
          id="user_input"
          className="flex-1 p-2 mr-2 text-lg resize-none overflow-hidden caret-sky-900" 
          placeholder="Enter your text here"
          value={userInput}
          onChange={handleInput}
          style={{ minHeight: '56px' }} 
        />
        <div className="flex items-center justify-center h-full">
          <button onClick={handleSendClick} className="w-30" disabled={isSending}>
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInput;
