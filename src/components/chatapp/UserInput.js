import React from 'react';

const UserInput = ({ userInput, setUserInput, submitToDatabase }) => {
  return (
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
  );
};

export default UserInput;
