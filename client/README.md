# AI Portfolio Builder Client Side

🔗 **Live Client URL:** [https://ai-portfolio-builder-ivory.vercel.app/](https://ai-portfolio-builder-ivory.vercel.app/)

> ✅ This client is fully connected to the backend server, which handles portfolio generation using Gemini AI.

## Technologies Used

### Client-Side (React)

* **Firebase Authentication (@firebase/auth):** Used to handle user authentication (sign up, log in, sign out).
* **React:** A JavaScript library for building user interfaces.
* **Material-UI (@mui/material):** A popular React UI framework providing pre-built, customizable components that implement Google's Material Design.
* **User Authentication:** Users can create an account and log in to access the portfolio generation features. This uses Firebase Authentication.
* **Export to PDF:** Logged-in users can export their generated portfolio as a PDF document. Users who are not logged in are prompted to sign up or log in.
* **Redux:** A predictable state management library for JavaScript applications, used to manage the user's input data and the generated portfolio.
* **Redux Toolkit (@reduxjs/toolkit):** A set of utilities that simplifies Redux development, including store setup, reducer creation, and asynchronous logic handling.
* **Redux Persist (redux-persist):** A library to persist and rehydrate Redux stores, used here to save the generated portfolio in `localStorage`.
* **Axios:** A promise-based HTTP client for making API requests to the backend server.
* **React Hooks (useState, useMemo):** Used for managing component state and optimizing performance.
* **React Router (potentially):** While not explicitly mentioned in the initial setup, it could be used for more complex navigation in future enhancements.
* **Error Handling (enqueueSnackbar):** enqueueSnackbar integrated to show a success or error message when the user signup, login (email/password or Google).
* **dotenv:** A package to load environment variables from a `.env` file, used to securely store the Firebase authentication keys.

## Setup Instructions

### Client-Side

1.  Navigate to the `client` directory: `cd client`
2.  Install dependencies: `npm install`
3.  Start the development server: `npm start` 
