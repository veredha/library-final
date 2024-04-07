const http = require('http');  // Importing the built-in 'http' module
const app = require('./app');  // Importing your Express application from 'app.js' or wherever it's defined
const port = process.env.PORT || 5055; // Specifying the port number, using environment variable PORT or defaulting to 3200

const server = http.createServer(app);  // Creating an HTTP server using your Express app
server.listen(port, () => {             // Starting the server and listening on the specified port
    console.log(`Server is running on port ${port}`);    // Logging a message when the server starts
});

