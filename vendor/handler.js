'use strict';

const eventPool = require('../eventpool.js');

function order(storeName, orderId, customerName) {
    const payload = {storeName, orderId, customerName};
    eventPool.emit('pickup', payload);
}

eventPool.on('delivered', (payload) => {
    console.log(`Vendor: Thank you for your order, ${payload.customerName}`);
});

module.exports = {order};