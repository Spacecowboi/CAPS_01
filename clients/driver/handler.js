'use strict';

// const eventPool = require('../../eventpool.js');
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001/caps');

//picking up
socket.on('pickup', (payload) => {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    socket.emit('in-transit', payload);

    //weewoo event is now happening above on line 10 ^
    // eventPool.emit('in-transit', payload);

    //delay, flat tire or something
    setTimeout(() => {
        console.log(`DRIVER: delivered ${payload.orderId}`);

        //delivery event
        socket.emit('delivered', payload);
    }, 3000);
});