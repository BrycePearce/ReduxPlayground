const socketio = require('socket.io');
const express = require("express");
const http = require("http");
const path = require('path');
const port = 3000;

const staticPath = path.join(__dirname, '../client');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(staticPath));

io.on('connection', (socket) => {
    socket.emit('welcomeEvent', 'Welcome!')

    socket.on('message', (message) => {
        io.emit('broadcastMessage', message);
    });
});


server.listen(port, () => {
    console.log('listening on:', port)
});