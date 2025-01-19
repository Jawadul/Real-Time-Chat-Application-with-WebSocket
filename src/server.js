// Import necessary modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize Express and create HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (HTML, CSS, JS) from 'public' directory
app.use(express.static('public'));

// Listen for incoming connections
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Join a room
    socket.on('joinRoom', (roomName) => {
        socket.join(roomName);
        console.log(`User joined room: ${roomName}`);
    });

    // Listen for chat messages and broadcast to room
    socket.on('chatMessage', (msg, roomName) => {
        io.to(roomName).emit('message', msg);
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server on port 3000
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
