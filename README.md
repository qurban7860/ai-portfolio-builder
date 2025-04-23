# AI Portfolio Builder

## Overview

This project is an AI-powered portfolio builder that allows users to quickly generate a personal portfolio by providing basic information such as their skills, experience, summary, and projects. The application leverages the power of the Gemini AI model to generate the HTML structure of the portfolio based on user input. Built with a modern web stack, it offers a user-friendly interface and a seamless experience from input to preview.

## Features Implemented

* **Interactive Form for User Input:** A clear and intuitive form allows users to input their key professional information:
    * **Summary:** A brief overview of their professional profile.
    * **Skills:** A comma-separated list of their technical and soft skills.
    * **Experience:** A multi-line text area to detail their work history.
    * **Projects:** A multi-line text area to list their notable projects.
* **AI-Powered Portfolio Generation:** Upon submitting the form, the user's data is sent to a backend server, which uses the Gemini AI model to generate a basic HTML portfolio structure.
* **Real-time Portfolio Preview:** The generated HTML is sent back to the client and displayed in a preview section, allowing users to see the initial output of their portfolio.
* **Light and Dark Theme Toggle:** A switch in the header enables users to toggle between a light and a dark theme for the application interface, enhancing usability and accessibility.
* **Persistent State with Redux Persist:** The generated portfolio data is stored in the Redux state and persisted using `redux-persist` and `localStorage`. This ensures that the portfolio preview remains visible even after a page refresh.
* **Attractive User Interface:** The application utilizes Material-UI components to provide a clean, modern, and responsive user interface with consistent styling and accessibility features.
* **Informative Header and Footer:** A header with the application title and a theme toggle, along with a footer displaying copyright information and a link to the source code repository (if applicable).
* **Engaging Introductory Text:** An introductory section with a compelling title and descriptive text encourages users to try the AI-powered portfolio builder.
* **Visual Appeal with Icons:** Material-UI icons are used in the header and introductory sections to enhance visual appeal and provide context.

## Technologies Used

### Client-Side (React)

* **React:** A JavaScript library for building user interfaces.
* **Material-UI (@mui/material):** A popular React UI framework providing pre-built, customizable components that implement Google's Material Design.
* **Material-UI Icons (@mui/icons-material):** A library of SVG icons following Material Design guidelines, used for visual elements.
* **Redux:** A predictable state management library for JavaScript applications, used to manage the user's input data and the generated portfolio.
* **Redux Toolkit (@reduxjs/toolkit):** A set of utilities that simplifies Redux development, including store setup, reducer creation, and asynchronous logic handling.
* **Redux Persist (redux-persist):** A library to persist and rehydrate Redux stores, used here to save the generated portfolio in `localStorage`.
* **Axios:** A promise-based HTTP client for making API requests to the backend server.
* **React Hooks (useState, useMemo):** Used for managing component state and optimizing performance.
* **React Router (potentially):** While not explicitly mentioned in the initial setup, it could be used for more complex navigation in future enhancements.

### Server-Side (Node/Express)

* **Node.js:** A JavaScript runtime environment for executing server-side code.
* **Express:** A minimal and flexible Node.js web application framework, providing routing and middleware functionality.
* **dotenv:** A package to load environment variables from a `.env` file, used to securely store the Gemini API key.
* **CORS (cors):** Middleware for Express to enable Cross-Origin Resource Sharing, allowing the client-side application (running on a different port) to make requests to the server.
* **node-fetch:** A library to make HTTP requests from Node.js to external APIs (in this case, the Gemini API).

### AI Model

* **Gemini API (via Google AI Node.js SDK or direct `fetch` calls):** Google's generative AI model used to process the user's input and generate the HTML code for the portfolio. Specifically, the `gemini-1.5-flash` model is used for content generation.

## Setup Instructions

### Client-Side

1.  Navigate to the `client` directory: `cd client`
2.  Install dependencies: `npm install`
3.  Start the development server: `npm start` (usually runs on `http://localhost:3000`)

### Server-Side

1.  Navigate to the `server` directory: `cd server`
2.  Install dependencies: `npm install`
3.  Create a `.env` file and add your Gemini API key:
    ```
    GEMINI_API_KEY=YOUR_ACTUAL_GEMINI_API_KEY
    ```
4.  Start the server: `node server.js` (usually runs on `http://localhost:5000`)
