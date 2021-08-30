const Order = require('../../src/models/Order');
const { CURRENCY } = require('../../src/constants');

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
    describe('getCost', () => {
        it('gets eth and usd symbols for a bid order, returns the order amount ETH &  and negative order amount per price USD', ()=>{
            const price = 200;
            const amount = 10;
            const type = 'bid';
            const order = new Order(price, amount, type);
            const eth = order.getCost(CURRENCY.ETH);
            const usd = order.getCost(CURRENCY.USD);
            expect(eth).toEqual(10);
            expect(usd).toEqual(-2000)
        });
        it('gets eth and usd symbols for a ask order, returns the order negative amount ETH &  and order amount per price USD', ()=>{
            const price = 200;
            const amount = 10;
            const type = 'ask';
            const order = new Order(price, amount, type);
            const eth = order.getCost(CURRENCY.ETH);
            const usd = order.getCost(CURRENCY.USD);
            expect(eth).toEqual(-10);
            expect(usd).toEqual(2000)
        });
    });
});
