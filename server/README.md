# AI Portfolio Builder

## Technologies Used

### Server-Side (Node/Express)

* **Node.js:** A JavaScript runtime environment for executing server-side code.
* **Express:** A minimal and flexible Node.js web application framework, providing routing and middleware functionality.
* **dotenv:** A package to load environment variables from a `.env` file, used to securely store the Gemini API key.
* **CORS (cors):** Middleware for Express to enable Cross-Origin Resource Sharing, allowing the client-side application (running on a different port) to make requests to the server.
* **node-fetch:** A library to make HTTP requests from Node.js to external APIs (in this case, the Gemini API).

### Server-Side

1.  Navigate to the `server` directory: `cd server`
2.  Install dependencies: `npm install`
3.  Create a `.env` file and add your Gemini API key:
    ```
    GEMINI_API_KEY=YOUR_ACTUAL_GEMINI_API_KEY
    ```
4.  Start the server: `node server.js` (usually runs on `http://localhost:5000`)
