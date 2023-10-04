'use strict';
//tests created using ChatGPT 3.5, very interesting methods of testing like spyOn
//tests for socket made using ChatGPT 3.5

const io = require('socket.io-client');
const vendor = require('./handler.js');

jest.mock('socket.io-client');

describe('Vendor handler', () => {
    let mockEmit;

    beforeEach(() => {
        mockEmit = jest.fn();
        io.connect.mockReturnValue({
            emit: mockEmit,
            on: jest.fn(),
        });
    });

    it('should emit a pickup event when an order is made', () => {
        vendor.order('Somestore', '123', 'Jane Doe');
        expect(mockEmit).toHaveBeenCalledWith('pickup', { storeName: 'Somestore', orderId: '123', customerName: 'Jane Doe'});
    });
});