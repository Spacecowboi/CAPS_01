'use strict';

// require('./vendor');
// require('./driver');

const io = require('socket.io')(3000);

const caps = io.of('/caps');

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
});