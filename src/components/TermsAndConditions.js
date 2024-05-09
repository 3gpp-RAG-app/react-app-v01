// TermsAndConditions.js
import React, { useState, useEffect } from 'react';
import termsAndConditionsArray from './assets/termsAndConditionsData';

const TypingPhrase = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const typingInterval = setInterval(() => {
        setDisplayText((prevText) => prevText + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, 15);
      return () => clearInterval(typingInterval);
    }
  }, [text, index]);

  return <span>{displayText}</span>;
};

const TypingText = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [sectionText, setSectionText] = useState('');

  useEffect(() => {
    const currentSection = termsAndConditionsArray[currentSectionIndex];
    if (currentSection) {
      const textToType = currentSection.terms.join(' ');

      setSectionText(textToType);

      const typingTimeout = setTimeout(() => {
        setCurrentSectionIndex((prevIndex) => prevIndex + 1);
      }, textToType.length * 20); 

      return () => clearTimeout(typingTimeout);
    }
  }, [currentSectionIndex]);

  return (
    <div className='bg-white bg-opacity-70 h-full rounded-md flex justify-center items-center'>
      <div className='h-5/6 w-5/6'>
        {termsAndConditionsArray.slice(0, currentSectionIndex + 1).map((section, index) => (
          <div className='font-sans text-base p-5 ml-5 mr-5 text-justify leading-loose' key={index}>
            <h2 className='text-xl pb-2'>{section.section}</h2>
            <div>
              <TypingPhrase text={section === termsAndConditionsArray[currentSectionIndex] ? sectionText : ''} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypingText;
