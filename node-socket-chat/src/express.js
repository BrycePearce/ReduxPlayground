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

let count = 0;
io.on('connection', (socket) => {
    console.log('User connected!')
    // send the current count to the new socket
    socket.emit('countUpdated', count);

    // listen for increment events
    socket.on('incremented', () => {
        count++;
        // io emits to every connection available
        io.emit('countUpdated', count)
    })
});


server.listen(port, () => {
    console.log('listening on:', port)
});