// initialize socket
const socket = io();

socket.on('welcomeEvent', (msg) => {
    console.log(msg)
});

socket.on('broadcastMessage', (msg) => {
    console.log(msg);
});


document.getElementById("send-button").addEventListener("click", () => {
    const input = document.getElementById('message-input').value;
    socket.emit('message', input);
});