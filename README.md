# AI Portfolio Builder

## 🔗 Live Links

- **Client:** [https://ai-portfolio-builder-ivory.vercel.app/](https://ai-portfolio-builder-ivory.vercel.app/)
- **Backend API:** [https://ai-portfolio-builder-server.vercel.app/](https://ai-portfolio-builder-server.vercel.app/)

> ✅ The backend server is fully connected with the client. The client app sends portfolio data to the backend API to generate the portfolio using the Gemini AI model.

---

## Overview

This project is an AI-powered portfolio builder that allows users to quickly generate a personal portfolio by providing basic information. Built with a modern web stack, it offers a user-friendly interface and a seamless experience from input to preview.

## Features Implemented

* **Interactive Form for User Input:** A clear and user-friendly form allows users to input their key professional information.
* **AI-Powered Portfolio Generation:** Upon submitting the form, the user's data is sent to a backend server, which uses the Gemini AI model to generate a basic HTML portfolio structure. The `gemini-1.5-flash` model is used for content generation.
* **User Authentication:** Users can create an account and log in to access the portfolio download features. This uses Firebase Authentication.
* **Export to PDF:** Logged-in users can export their generated portfolio as a PDF document. Users who are not logged in are prompted to sign up or log in.
* **Real-time Portfolio Preview:** The generated HTML is sent back to the client and displayed in a preview section, allowing users to see the initial output of their portfolio.
* **Light and Dark Theme Toggle:** A switch in the header enables users to toggle between a light and a dark theme for the application interface, enhancing usability and accessibility.
* **Persistent State with Redux Persist:** The generated portfolio data is stored in the Redux state and persisted using `redux-persist` and `localStorage`. This ensures that the portfolio preview remains visible even after a page refresh.
* **Attractive User Interface:** The application utilizes Material-UI components to provide a clean, modern, and responsive user interface with consistent styling and accessibility features.

## Technologies Used

### Client-Side (React)

* **React:** A JavaScript library for building user interfaces.
* **Firebase Authentication (@firebase/auth):** Used to handle user authentication (sign up, log in, sign out).
* **Material-UI (@mui/material):** A popular React UI framework providing pre-built, customizable components that implement Google's Material Design.
* **Redux:** A predictable state management library for JavaScript applications, used to manage the user's input data and the generated portfolio.
* **Redux Toolkit (@reduxjs/toolkit):** A set of utilities that simplifies Redux development, including store setup, reducer creation, and asynchronous logic handling.
* **Redux Persist (redux-persist):** A library to persist and rehydrate Redux stores, used here to save the generated portfolio in `localStorage`.
* **Axios:** A promise-based HTTP client for making API requests to the backend server.
* **React Hooks (useState, useMemo):** Used for managing component state and optimizing performance.
* **React Router (react-router-dom):** Used for navigation within the application.
* **Error Handling (enqueueSnackbar):** enqueueSnackbar integrated to show a success or error message when the user signup, login (email/password or Google).
* **dotenv:** A package to load environment variables from a `.env` file, used to securely store the Firebase authentication key.

### Server-Side (Node/Express)

* **Node.js:** A JavaScript runtime environment for executing server-side code.
* **Express:** A minimal and flexible Node.js web application framework, providing routing and middleware functionality.
* **dotenv:** A package to load environment variables from a `.env` file, used to securely store the Gemini API key.
* **CORS (cors):** Middleware for Express to enable Cross-Origin Resource Sharing, allowing the client-side application (running on a different port) to make requests to the server.
* **node-fetch:** A library to make HTTP requests from Node.js to external APIs (in this case, the Gemini API).

### AI Model

* **Gemini API (via Google AI Node.js SDK or direct `fetch` calls):** Google's generative AI model used to process the user's input and generate the HTML code for the portfolio. Specifically, the `gemini-1.5-flash` model is used for content generation.

## Setup Instructions

### Prerequisites

* A Google Cloud account with the Gemini API enabled.
* Node.js and npm installed on your machine.

### Client-Side

1.  Navigate to the client directory: cd client
2.  Install dependencies: npm install
3.  Start the development server: npm start 

### Server-Side

1.  Navigate to the server directory: cd server
2.  Install dependencies: npm install
3.  Create a .env file in the server directory and add your Gemini API key.
