# 3GPP Assistant Frontend

## Introduction

This is the repository for the frontend of the 3GPP Assistant. This interface acts as a bridge between users and the server, 
where questions about 3GPP specifications are processed and answered using the available database. While the technical functions 
reside on the server side, this frontend facilitates the retrieval and presentation of relevant data in a format optimized for 
working with 3GPP specifications. It simplifies the access to information, allowing users to interact with 3GPP specifications 
effectively and efficiently.

### Introduction to the code within the repository

Sidebar: Renders navigation links for different sections of the application - Chat, User Guide, Terms and Privacy, Assistance and Feedback.

ChatApp: The main component responsible for displaying the chat interface where users can interact with the chatbot.

UserInput: Allows users to input text messages and send them to the chatbot. It also handles sending messages on pressing the Enter key.

ChatMessagesContainer: Renders the messages exchanged between the user and the chatbot. It displays both user messages and the chatbot's responses. Users can also rate the responses.

About: Provides information about the 3GPP ChatBot, its mission, how it works, the importance of user feedback, and its privacy policy.

Privacy: Presents the privacy policy for the 3GPP ChatBot, detailing the information collected, its usage, sharing policies, user rights, and contact information for privacy concerns.

UserGuide: Offers a user guide explaining the covered scope, third-party integrations, workflow, context injection, query recommendations, and system parameters of the chatbot.

TermsAndConditions: Presents terms and conditions regarding the usage of the chatbot, including sections on general terms, data collection and usage, privacy policy, user consent, changes to terms, and contact information.

ConsentDialog: Displays a dialog box asking users to agree to the data collection and usage policies before using the chatbot.

ContactInformation: Provides contact details for the development team, encouraging users to provide feedback and suggestions for improving the application.

App: The main entry point of the application, sets up routing using React Router, and manages the consent dialog display state and fetching of user ID.

This application allows users to interact with a chatbot designed to provide information about 3GPP standards, with features for privacy policy acknowledgment, user guidance, and feedback collection.

## Installation and Instructions

### Requirements

Ensure you have Node.js installed on your machine and have cloned the repository.

### Build

To build and serve the production-ready files, follow these steps:

Clone this repository to your local machine.

    git clone https://github.com/3gpp-RAG-app/react-app-v01.git

Navigate to the project directory.

    cd react-app-v01

Install dependencies using npm.

    npm install

You can use this command to immediately run it:

    npm run dev

or you can build the project using the following command:

    npm run build

and start the build with this:

    npm start

### Important Information

The frontend only provides support for desktop usage. It's essential to note that the chatbot 
within the frontend requires a connection to both the server and the database for functionality. 
Therefore, when deploying the frontend, ensure that a stable connection to the server is established 
to enable the chatbot's operation.

### Folder Structure

project/\
├── node_modules/\
├── public/\
│   ├── favicon.ico\
│   ├── index.html\
│   ├── logo192.png\
│   ├── logo512.png\
│   ├── manifest.json\
│   └── robots.txt\
├── src/\
│   ├── components/\
│   │   ├── assets/\
│   │   │   ├── antti.png\
│   │   │   ├── mufida.jpg\
│   │   │   ├── termsAndConditionsData.js\
│   │   │   ├── ug.jpeg\
│   │   │   ├── ug1.png\
│   │   │   └── yinan.jpeg\
│   │   ├── chatapp/\
│   │   │   ├── ChatApp.js\
│   │   │   ├── ChatMessagesContainer.js\
│   │   │   └── UserInput.js\
│   │   ├── About.js\
│   │   ├── ConsentDialog.js\
│   │   ├── ContactInformation.js\
│   │   ├── Privacy.js\
│   │   ├── Sidebar.js\
│   │   ├── TermsAndConditions.js\
│   │   └── UserGuide.js\
│   ├── config/\
│   │   └── EndPoints.js\
│   ├── App.js\
│   ├── App.test.js\
│   ├── index.css\
│   ├── index.js\
│   ├── logo.svg\
│   ├── reportWebVitals.js\
│   └── setupTests.js\
├── .gitignore\
├── package-lock.json\
├── package.json\
├── Procfile\
├── README.md\
└── tailwind.config.js\
