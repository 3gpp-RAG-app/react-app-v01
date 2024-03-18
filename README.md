# 3GPP Frontend

## Introduction

Welcome to the frontend of the 3GPP Assistant. This interface acts as a bridge between users and the server, where questions about 3GPP specifications are processed and answered using the available database. While the technical functions reside on the server side, this frontend facilitates the retrieval and presentation of relevant data in a format optimized for working with 3GPP specifications. It simplifies the access to information, allowing users to interact with 3GPP specifications effectively and efficiently.

## Installation

### Requirements

    Ensure you have Node.js installed on your machine.
    Clone this repository to your local machine using:
    git clone https://github.com/3gpp-RAG-app/react-app-v01.git.

### Build

    To build and serve the production-ready files, follow these steps:

    Clone this repository to your local machine.

    git clone https://github.com/3gpp-RAG-app/react-app-v01.git

    Navigate to the project directory.

    cd react-app-v01

    Install dependencies using npm.

    npm install

    Build the project using the following command:

    npm run build

    Start the server to serve the production build:

    npm start

    This command sets the PORT environment variable to 80 and serves the build directory using the serve command.

    You can also use the 'npm run dev' command

## Important Information

    Frontend works only on desktop currently and has no mobile support so keep that in mind when using it.

## Deployment Instructions

    Frontends chatbot will not work without connection to the server and database so if you intend to deploy it make sure the connection to server is present.

## Folder Structure

project/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── assets/
│   │   │   ├── antti.png
│   │   │   ├── mufida.jpg
│   │   │   ├── termsAndConditionsData.js
│   │   │   ├── ug.jpeg
│   │   │   ├── ug1.png
│   │   │   └── yinan.jpeg
│   │   ├── chatapp/
│   │   │   ├── ChatApp.js
│   │   │   ├── ChatMessagesContainer.js
│   │   │   └── UserInput.js
│   │   ├── About.js
│   │   ├── ConsentDialog.js
│   │   ├── ContactInformation.js
│   │   ├── Privacy.js
│   │   ├── Sidebar.js
│   │   ├── TermsAndConditions.js
│   │   └── UserGuide.js
│   ├── config/
│   │   └── EndPoints.js
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package-lock.json
├── package.json
├── Procfile
├── README.md
└── tailwind.config.js