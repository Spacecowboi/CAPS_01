'use strict';

// const eventPool = require('../../eventpool.js');
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3001/caps');

const storeName = 'Somestore';

socket.emit('join', storeName);

function order(storeName, orderId, customerName, address) {
    const payload = {storeName, orderId, customerName, address};
    socket.emit('pickup', payload);
}

socket.on('delivered', (payload) => {
    console.log(`Vendor: Thank you for your order, ${payload.customerName}`);
});

setInterval(() => {
    order(storeName, '123', 'Jane Doe', '123 St');
}, 5000);

module.exports = {order};