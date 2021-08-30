const _ = require('lodash');
const {
    createRandomOrders,
    createRandomBid,
    createRandomAsk,
} = require('../../src/services/orders');
const Order = require('../../src/models/Order');

describe('orders', () => {
    describe('createRandomBid', () => {
        it('gets top and bottom price and balances. Returns an order for random price in range and random amount in balance range', () => {
            const top = 1000;
            const bottom = 900;
            const balances = {
                USD: 2000,
                ETH: 10,
            };
            const order = createRandomBid({ top, bottom }, balances);
            expect(order.price).toBeLessThanOrEqual(top);
            expect(order.price).toBeGreaterThanOrEqual(bottom);
            expect(order.price * order.amount).toBeLessThanOrEqual(
                balances.USD
            );
            expect(order).toBeInstanceOf(Order);
            expect(order.type).toEqual('bid');
        });
    });
    describe('createRandomAsk', () => {
        it('gets top and bottom price and balances. Returns an order for random price in range and random amount in balance range', () => {
            const top = 1000;
            const bottom = 900;
            const balances = {
                USD: 2000,
                ETH: 10,
            };
            const order = createRandomAsk({ top, bottom }, balances);
            expect(order.price).toBeLessThanOrEqual(top);
            expect(order.price).toBeGreaterThanOrEqual(bottom);
            expect(order.amount).toBeLessThanOrEqual(balances.ETH);
            expect(order).toBeInstanceOf(Order);
            expect(order.type).toEqual('ask');
        });
    });
    describe('createRandomOrders', () => {
        it('gets number of bid and ask orders to create, returns array with proper number of orders', () => {
            const edgePrices = {
                bid: { top: 1000, bottom: 900 },
                ask: { top: 800, bottom: 900 },
            };
            const balances = {
                USD: 2000,
                ETH: 10,
            };
            const orders = createRandomOrders(3, 4, edgePrices, balances);
            const groupedOrders = _.groupBy(orders, order => order.type);
            expect(groupedOrders.bid.length).toEqual(3);
            expect(groupedOrders.ask.length).toEqual(4);
        });
    });
});