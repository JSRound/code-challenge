const _ = require('lodash');
const { PRICE, ORDER } = require('../constants');

const formatPrice = ([price, quantity, amount]) => ({
    [PRICE.PRICE]: price,
    [PRICE.QUANTITY]: quantity,
    [PRICE.AMOUNT]: amount,
});

const getGroupedPrices = (parsedPrices) =>
    _.groupBy(parsedPrices, ({ amount }) => amount > 0);

const parseGroupedPrices = (prices) => ({
    [ORDER.BID]: prices['true'],
    [ORDER.ASK]: prices['false'],
});

module.exports = {
    formatPrice,
    getGroupedPrices,
    parseGroupedPrices,
};
