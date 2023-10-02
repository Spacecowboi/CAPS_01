'use strict';
//tests created using ChatGPT 3.5, very interesting methods of testing like spyOn

const eventPool = require('../eventpool.js');
const vendor = require('./handler.js');

jest.spyOn(eventPool, 'emit');
jest.spyOn(console, 'log');

describe('Vendor handler', () => {
    it('should emit a pickup event when an order is made', () => {
        vendor.order('Somestore', '123', 'Jane Doe');
        expect(eventPool.emit).toHaveBeenCalledWith('pickup', { storeName: 'Somestore', orderId: '123', customerName: 'Jane Doe'});
    });

    it('should log a thank you message when a delivered event is received', () => {
        eventPool.emit('delivered', { storeName: 'Somestore', orderId: '123', customerName: 'Jane Doe'});
        expect(console.log).toHaveBeenCalledWith('Vendor: Thank you for your order, Jane Doe');
    });
});