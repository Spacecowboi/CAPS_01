'use strict';

class MessageQueue {
    constructor() {
        this.queue = {};
    }
 //add a new message to the queue
    add(clientId, payLoad) {
        if (!this.queue[clientId]) {
            this.queue[clientId] = [];
        }
        this.queue[clientId].push(payLoad);
    }
    // get all the messages in the queue for a specific client
    getAll(clientId) {            //OR an empty array for when messages arrive
        return this.queue[clientId] || [];
    }
    // remove a message from the queue 
    remove(clientID, messageId) {
        if (this.queue[clientId]) {
            this.queue[clientId] = this.queue[clientId].filter(message => message.id !== messageId);
        }
    }
}

module.exports = new MessageQueue();