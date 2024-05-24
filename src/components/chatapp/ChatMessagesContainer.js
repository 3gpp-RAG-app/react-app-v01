// ChatMessagesContainer.js
import React from 'react';
import ReactMarkdown from 'react-markdown';

const ChatMessagesContainer = ({
  chatMessages,
  handleToggleClick,
  showSourceArray,
  responseRatings,
  handleRating,
}) => {

  return (
    <div className='h-full basis-5/7 bg-white bg-opacity-70 rounded-md m-4 overflow-auto'>
      <div className='p-5 font-sans text-lg antialiased'>
        {chatMessages.map((message, index) => (
          <div key={index} className={message.type === 'user' ? 'user-message' : 'server-message'}>
            {message.type === 'user' ? (
              <div className=" bg-white rounded-md p-3 m-3 flex flex-row">
                <div className='basis-6/7 pl-3 user-message-text'>{message.text}</div>
              </div>
            ) : (
              <div className="bg-white rounded-md p-3 m-3">
                <ReactMarkdown className="server-message-text">{message.text}</ReactMarkdown>
                {message.source && (
                  <div className='pt-4 text-sm italic' onClick={() => handleToggleClick(index)} style={{ cursor: 'pointer' }}>
                    Sources:
                    {message.source.map((retrival, retrivalIndex) => (
                      <div key={retrivalIndex}>
                        {retrival.parentDoc} section {retrival.contentList}
                        {/*CR: {retrival.cr} spec: {retrival.spec}*/}
                      </div>
                    ))}
                  </div>
                )}
                {showSourceArray[index] && (
                  <div>
                    {message.source.map((retrival, retrivalIndex) => (
                      <div className="original-text-message" key={retrivalIndex}>
                        {<ReactMarkdown>{retrival.text}</ReactMarkdown>}
                        <ReactMarkdown>{retrival.summary}</ReactMarkdown>
                      </div>
                    ))}
                  </div>
                )}
                {message.source && (
                  <div className='text-sm flex flex-col pt-4'>
                    {responseRatings[index] === undefined && (
                      <React.Fragment>
                        Did this answer your question?
                        <div className='underline decoration-sky-900 text-sky-900 flex justify-end space-x-20'>
                          <div className="cursor-pointer" onClick={() => handleRating(index, true)}>Yes</div>
                          <div className="cursor-pointer" onClick={() => handleRating(index, false)}>No</div>
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
  );
};

export default ChatMessagesContainer;