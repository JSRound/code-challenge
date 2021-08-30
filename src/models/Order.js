const { CURRENCY } = require('../constants');

class Order {
    constructor(price, amount, type) {
        this.price = price;
        this.amount = amount;
        this.type = type;
    }

    getCost(symbol) {
        // If ETH increase, USD decrease for bids, and reverse for asks
        const modEth = this.type === 'bid' ? 1 : -1;
        const modUsd = modEth * -1;
        return symbol === CURRENCY.ETH
            ? this.amount * modEth
            : this.amount * this.price * modUsd;
    }
}

module.exports = Order;