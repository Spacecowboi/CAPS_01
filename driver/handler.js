'use strict';

const eventPool = require('../eventpool.js');

//picking up
eventPool.on('pickup', (payload) => {
    console.log(`DRIVER: picked up ${payload.orderId}`);

    //weewoo event
    eventPool.emit('in-transit', payload);

    //delay, flat tire or something
    setTimeout(() => {
        console.log(`DRIVER: delivered ${payload.orderId}`);

        //delivery event
        eventPool.emit('delivered', payload);
    }, 3000);
});