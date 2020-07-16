// initialize socket
const socket = io();

socket.on('countUpdated', (count) => {
    console.log('updated count', count)
});


document.getElementById("increment").addEventListener("click", () => {
    socket.emit('incremented');
});