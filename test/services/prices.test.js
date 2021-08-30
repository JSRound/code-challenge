const _ = require('lodash');
const { ORDER } = require('../../src/constants');
const {
    getEdgePrices,
    getDeltaValues,
    getEdgeValues,
} = require('../../src/services/prices');

describe('prices', () => {
    describe('getEdgePrices', () => {
        it('get prices and return edge prices for bid/ask', () => {
            const prices = {
                [ORDER.BID]: [
                    { price: 3225.1, quantity: 6, amount: 6.2821 },
                    { price: 3205.1, quantity: 1, amount: 0.62477363 },
                ],
                [ORDER.ASK]: [
                    { price: 3205.2, quantity: 7, amount: -9.84307936 },
                    { price: 3225.2, quantity: 2, amount: -10.50651926 },
                ],
            };

            const edgePrices = getEdgePrices(prices);
            expect(edgePrices).toEqual({
                [ORDER.BID]: { top: 3225.1, bottom: 3224.1 },
                [ORDER.ASK]: { top: 3205.2, bottom: 3206.2 },
            });
        });
    });

    describe('getDeltaValues', () => {
        it('gets a bid max and min value and a delta %. Returns the max value and the % below', () => {
            const max = 3225.1;
            const min = 3205.1;
            const delta = 0.05;
            const deltaValues = getDeltaValues(max, min, delta);
            expect(deltaValues).toEqual({ top: max, bottom: 3224.1 });
        });
        it('gets an ask max and min value and a delta %. Returns the max value and % above', () => {
            const max = 3205.2;
            const min = 3225.2;
            const delta = 0.05;
            const deltaValues = getDeltaValues(max, min, delta);
            expect(deltaValues).toEqual({ top: max, bottom: 3206.2 });
        });
    });

    describe('getEdgeValues', () => {
        it('get a list and return first and last element', () => {
            const list = _.range(0, 11);
            const result = getEdgeValues(list);
            expect(result).toEqual([0, 10]);
        });
    });
});
