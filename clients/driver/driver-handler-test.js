'use strict';
//tests created using ChatGPT 3.5, very interesting methods of testing like spyOn
//tests for socket made using ChatGPT 3.5
const io = require('socket.io-client');
require('./handler.js');

jest.mock('socket.io-client');

describe('Driver handler', () => {
    let mockEmit, mockOn;

    beforeEach(() => {
        mockEmit = jest.fn();
        mockOn = jest.fn();
        io.connect.mockReturnValue({
            emit: mockEmit,
            on: mockOn,
        });
    });

    it('should emit an in-transit event and log a pickup message when a pickup event is received', () => {
        const payload = { storeName: 'Somestore', orderId: '123', customerName: 'Jane Doe' };
        mockOn.mockImplementation((event, callback) => {
            if (event === 'pickup') {
                callback(payload);
            }
        });
        expect(mockEmit).toHaveBeenCalledWith('in-transit', payload);
    });
});