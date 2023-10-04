'use strict';
//tests created using ChatGPT 3.5, very interesting methods of testing like spyOn
const eventPool = require('../eventpool.js');
require('./handler.js');

jest.useFakeTimers();
jest.spyOn(eventPool, 'emit');
jest.spyOn(console, 'log');

describe('Driver handler', () => {
  it('should emit an in-transit event and log a pickup message when a pickup event is received', () => {
    eventPool.emit('pickup', { storeName: 'Somestore', orderId: '123', customerName: 'Jane Doe' });
    expect(console.log).toHaveBeenCalledWith('DRIVER: picked up 123');
    expect(eventPool.emit).toHaveBeenCalledWith('in-transit', { storeName: 'Somestore', orderId: '123', customerName: 'Jane Doe' });
  });

  it('should emit a delivered event and log a delivery message after a delay when a pickup event is received', () => {
    eventPool.emit('pickup', { storeName: 'Somestore', orderId: '123', customerName: 'Jane Doe' });
    jest.runAllTimers();
    expect(console.log).toHaveBeenCalledWith('DRIVER: delivered 123');
    expect(eventPool.emit).toHaveBeenCalledWith('delivered', { storeName: 'Somestore', orderId: '123', customerName: 'Jane Doe' });
  });
});