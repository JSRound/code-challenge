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

const constants = Object.freeze({
    CURRENCY, POLLING
});

module.exports = constants;