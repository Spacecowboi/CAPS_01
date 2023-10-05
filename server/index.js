'use strict';

const io = require('socket.io')(3001);
const caps = io.of('/caps');

let queue = {};
//socket connections listening to PORT w/event handlers
caps.on('connection', (socket) => {
    socket.on('join', (room) => {
        socket.join(room);
    });
    socket.on('pickup', (payload) => {
        addToQueue('pickup', payload);
        caps.emit('pickup', payload);
    });
    socket.on('delievered',(payload) => {
        addToQueue('delivered', payload);
        caps.emit('delivered', payload);
    });
    socket.on('recieved', (payload) => {
        deleteFromQueue(payload);
    });
    socket.on('getAll', (payload) => {
        let messages = getFromQueue(payload);
        messages.forEach(message => {
            caps.to(payload.clientId).emit(message.event, message.payload);
        });
    });
});
//message queue management functions
function addToQueue(event, payload) {
    if (!queue[payload.store]) {
        queue[payload.store] = {};
    }
    if (!queue[payload.store][event]) {
        queue[payload.store][event] = [];
    }
    queue[payload.store][event].push(payload);
}

function deleteFromQueue(payload) {
    let index = queue[payload.clientId][payload.event].findIndex((item) => item.orderId === payload.messageId);
    if (index !== -1) {
        queue[payload.clientId][payload.event].splice(index, 1);
    }
}

function getFromQueue(payload) {
    return queue[payload.clientId][payload.event] || [];
}