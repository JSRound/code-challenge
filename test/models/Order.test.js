const Order = require('../../src/models/Order');

describe('Order', () => {
    describe('constructor', () => {
        it('gets parameter and set the properties of the object appropriately', () => {
            const price = 200;
            const amount = 10;
            const type = 'bid';
            const order = new Order(price, amount, type);
            expect(order).toEqual({ price, amount, type });
        });
    });
});
