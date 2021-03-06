const _ = require('lodash');
const Order = require('../models/Order');
const { CURRENCY } = require('../constants');

function createRandomBid({ top, bottom }, balances) {
    const price = _.random(top, bottom);
    const maxAmount = balances[CURRENCY.USD] / price;
    const amount = _.random(0, maxAmount);
    return new Order(price, amount, 'bid');
}

function createRandomAsk({ top, bottom }, balances) {
    const price = _.random(top, bottom);
    const amount = _.random(0, balances[CURRENCY.ETH]);
    return new Order(price, amount, 'ask');
}

function createRandomOrders(nBids, nAsks, edgePrices, balances) {
    const bids = _.range(0, nBids).map(() =>
        createRandomBid(edgePrices.bid, balances)
    );
    const asks = _.range(0, nAsks).map(() =>
        createRandomAsk(edgePrices.ask, balances)
    );
    // Shuffle to avoid lockdown as too many orders of the same type together can run out the balance
    return _.shuffle([...bids, ...asks]);
}

function validateBid(order, maxBid, balance) {
    const priceOk = order.price > maxBid;
    const balanceOk = balance[CURRENCY.USD] - order.price * order.amount > 0;
    return priceOk && balanceOk;
}

function validateAsk(order, minAsk, balance) {
    const priceOk = order.price < minAsk;
    const balanceOk = balance[CURRENCY.ETH] - order.amount > 0;
    return priceOk && balanceOk;
}

module.exports = {
    createRandomOrders,
    createRandomBid,
    createRandomAsk,
    validateBid,
    validateAsk
};