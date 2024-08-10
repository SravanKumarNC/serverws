// Import required modules
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

// Initialize an Express application
const app = express();

// Create an HTTP server and pass in the Express app
const server = http.createServer(app);

// Initialize a WebSocket server instance attached to the HTTP server
const wss = new WebSocket.Server({ server });

// Variable to store the latest WebSocket message
let latestMessage = 'No messages received yet.';

// Setup a route to handle HTTP GET requests
app.get('/', (req, res) => {
    res.send('Hello from the Express server!');
});
// Setup a route to handle HTTP GET requests
app.get('/wss', (req, res) => {
    res.send(`Latest message from WebSocket: ${latestMessage}`);
});


// Handle WebSocket connections
wss.on('connection', (ws) => {
    console.log('A new WebSocket client connected.');

    // Listen for messages from the WebSocket client
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
                // Store the received message
                latestMessage = message;
        // Echo the received message back to the client
        ws.send(`You said: ${message}`);
    });

    // Handle client disconnections
    ws.on('close', () => {
        console.log('A WebSocket client disconnected.');
    });
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running `);
});
