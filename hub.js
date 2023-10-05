'use strict';

// require('./vendor');
// require('./driver');

const io = require('socket.io')(3001);
const PORT = process.env.PORT || 3001
const caps = io.of('/caps');
const queue = require('./server/queue')


console.log(`Server is running on port ${PORT}`);

// const server = new Server(PORT);

caps.on('connection', (socket) => {
  console.log('Connected', socket.id);

  socket.on('join', (room) => {
    console.log('Room Name:', room);
    socket.join(room);
  });

  socket.on('pickup', (payload) => {
    console.log('Event: pickup', payload);
    caps.to(payload.storeName).emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    console.log('Event: in-transit', payload);
    caps.to(payload.storeName).emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    console.log('Event: delivered', payload);
    caps.to(payload.storeName).emit('delivered', payload);
  });

  socket.on('received', (payload) => {
    console.log('Event: receieved', payload);
    queue.remove(payload.clientId, payload.messageId);
  });

  socket.on('getAll', (payload) => {
    console.log('Event: getAll', payload);
    const messages = queue.getAll(payload.clientId);
    messages.forEach(message => {
      socket.emit(message.event, message.payload);
    });
  });
});