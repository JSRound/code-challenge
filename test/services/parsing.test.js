const {
    formatPrice
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
});
