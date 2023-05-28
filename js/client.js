const socket = io('http://localhost:8000');
// Get DOM elements in respective Js variables

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

// Audio that will play on receiving messages
var audio = new Audio('ting.mp3');

// Function which will append event info to the contaner
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}

// ask for name and let server know
const names = prompt("Enter your name to join ");
socket.emit('new-user-joined', names);

// if a new user joined recieve name from the fromserver
socket.on('user-joined', name => {
        append(`${name} joined the chat`, 'right')
    })
    // if server sends a message receive it 
socket.on('receive', data => {
        append(`${data.name}:${data.message}`, 'left')
    })
    // if user leave send message to sever 
socket.on('left', name => {
    append(`${name} left the chat`, 'right')
})

// if from get submited , send message to sever
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInput.value = "";

});