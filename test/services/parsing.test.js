const {
    formatPrice,
    getGroupedPrices,
    parseGroupedPrices,
} = require('../../src/services/parsing');
const { PRICE } = require('../../src/constants');

describe('parsing', () => {
    describe('formatPrice', () => {
        it('gets array price (webService format) and return price object', () => {
            const price = 3200.7;
            const quantity = 2;
            const amount = 0.018;
            const wsPrice = [price, quantity, amount];
            const formattedPrice = formatPrice(wsPrice);
            expect(formattedPrice).toEqual({
                [PRICE.PRICE]: price,
                [PRICE.QUANTITY]: quantity,
                [PRICE.AMOUNT]: amount,
            });
        });
    });

    describe('getGroupedPrices', () => {
        it('gets prices object and return prices grouped by true/false accoring amount >0 (+bid/-ask)', () => {
            const formattedPrices = [
                { price: 3194.8, quantity: 5, amount: 0.164636 },
                { price: 3194.7, quantity: 1, amount: 3.130522 },
                { price: 3197.4, quantity: 1, amount: -0.3449 },
                { price: 3197.5, quantity: 3, amount: -1.38181926 },
            ];
            const groupedPrices = getGroupedPrices(formattedPrices);
            expect(groupedPrices).toEqual({
                true: [
                    { price: 3194.8, quantity: 5, amount: 0.164636 },
                    { price: 3194.7, quantity: 1, amount: 3.130522 },
                ],
                false: [
                    { price: 3197.4, quantity: 1, amount: -0.3449 },
                    { price: 3197.5, quantity: 3, amount: -1.38181926 },
                ],
            });
        });
    });
    describe('parseGroupedPrices', () => {
        it('gets grouped prices by true/false and return grouped prices by bid/ask', () => {
            const groupedPrices = {
                true: [
                    { price: 3194.8, quantity: 5, amount: 0.164636 },
                    { price: 3194.7, quantity: 1, amount: 3.130522 },
                ],
                false: [
                    { price: 3197.4, quantity: 1, amount: -0.3449 },
                    { price: 3197.5, quantity: 3, amount: -1.38181926 },
                ],
            };
            const parsedPrices = parseGroupedPrices(groupedPrices);
            expect(parsedPrices).toEqual({
                bid: [
                    { price: 3194.8, quantity: 5, amount: 0.164636 },
                    { price: 3194.7, quantity: 1, amount: 3.130522 },
                ],
                ask: [
                    { price: 3197.4, quantity: 1, amount: -0.3449 },
                    { price: 3197.5, quantity: 3, amount: -1.38181926 },
                ],
            });
        });
    });
});
