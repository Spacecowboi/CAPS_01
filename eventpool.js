'use strict';

const events = require('events');

// singleton
const eventEmitter = new events.EventEmitter();

//listening for all events
eventEmitter.on('pickup', timeStamp);
eventEmitter.on('in-transit', timeStamp);
eventEmitter.on('delievered', timeStamp);

//what happens when we log event
function timeStamp(payload) {
    console.log(`EVENT ${this.event}:`, new Date(), payload);
}

module.exports = eventEmitter;
