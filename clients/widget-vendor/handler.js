'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001/caps');

const storeName = 'acme-widgets';

socket.emit('join', storeName);

socket.on('connect', () => {
    console.log('Connected to CAPS as', storeName);
    //on connect, gegt all the client names (stores)
    socket.emit('getAll', {clientId: storeName});
});

socket.on('delivered', (payload) => {
    console.log(`Order ${payload.orderId} was delivered`);
    socket.emit('received', {clientId: storeName, messageId: payload.orderId});
});