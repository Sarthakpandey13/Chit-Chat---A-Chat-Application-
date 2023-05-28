// Node sever which will handle socket io connections 
const io = require('socket.io')(8000);

const users = {}

io.on('connection', socket => {
    socket.on('new-user-joined', name => {
            // Store the user's name or perform any desired actions
            users[socket.id] = name;

            // You can also broadcast the user's name to other clients
            socket.broadcast.emit('user-joined', name);
        })
        // if someone send a message,broadcast it to other people
    socket.on('send', message => {
            socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
        })
        // if someone leave the chat let others know
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
})