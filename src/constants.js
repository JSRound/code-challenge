const CURRENCY = Object.freeze({
    ETH: 'ETH',
    USD: 'USD',
});

const POLLING = Object.freeze({
    ORDERS: 'ORDERS',
    BALANCE: 'BALANCE',
    TIME: {
        ORDERS: 5000,
        BALANCE: 30000,
    },
});
const PRICE = Object.freeze({
    AMOUNT: 'amount',
    PRICE: 'price',
    QUANTITY: 'quantity'
});

const ORDER = Object.freeze({
    BID: 'bid',
    ASK: 'ask'
});

const constants = Object.freeze({
    CURRENCY, POLLING, ORDER, PRICE
});

module.exports = constants;