import React from 'react';
import { Link } from 'react-router-dom';

const ConsentDialog = ({ onAgree, onClose }) => {
  return (
    <div className='overflow-auto bg-[#85A4B6] bg-opacity-50 rounded-md max-w-4xl h-4/6  shadow-lg shadow-sky-90060'>
      <div className='m-10 p-10 font-sans text-lg '>
            <div className='text-justify flex flex-col leading-relaxed space-y-4'>
                <p>Hello there!</p>
                <p>We value privacy and we would like to transparently communicate the data collection and usage practices of our open-source 3gg chat development project.</p>
                <p>In the initial phase, our system relies on general-purpose language models to provide answers based on the 3GPP documentation.</p>
                <p>In the next step of development, we aim to enhance the chat performance by training specific embedding model to the task.</p>
                <p>During this phase, we will collect and utilize data from users' interactions with the app for improvement.</p>
                <p>The data collected is pairs of user questions and system responses, along with the corresponding ratings indicating whether the answer is deemed correct or incorrect by the user.</p>
                <p className='font-semibold'>We do not collect any personally identifiable information or any data beyond the user's
                 interaction with the chatapp. The sole purpose of gathering this information is to refine our app to better meet your informational needs.</p>
            </div>
            <div className='pt-20 flex justify-end space-x-36'>
            <Link className='underline  decoration-sky-900 text-sky-900' to="/privacy">Learn More</Link>
            <button onClick={onAgree}>I Agree</button>
            </div>
        </div>
    </div>
  );
};

export default ConsentDialog;