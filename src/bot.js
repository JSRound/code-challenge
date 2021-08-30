const _ = require('lodash');
const { CURRENCY, ORDER, POLLING } = require('./constants');
const Account = require('./models/Account');
const { getEdgePrices } = require('./services/prices');
const { logBalance, logFilledOrder } = require('./services/logging');
const {
  createRandomOrders,
  validateBid,
  validateAsk,
} = require('./services/orders');
/**
 * @typedef Order
 * @property {Number} price
 * @property {Number} quantity
 */

/**
 *
 * @param {function} getOrderBook fetches the order book split by bids and asks
 */
module.exports = (getOrderBook) => {
    const account = new Account([
        { currency: CURRENCY.ETH, amount: 10 },
        { currency: CURRENCY.USD, amount: 2000 },
    ]);
    const polling = {};
    let orders = [];
    const filledOrders = [];
    /**
     * Start the bot and place initial orders
     * Watch for changes and fill on interval
     */
    async function start() {
        // get prices
        const prices = await getOrderBook();
        // Get edge prices - Prices are yet sorted from webService so no sorting is necessary
        const edgePrices = getEdgePrices(prices);
        // create random orders
        orders = createRandomOrders(5, 5, edgePrices, account.getBalances());
        // start polling
        pollingOrders();
        pollingBalances();
    }

    function pollingOrders() {
        // Interval each 5 seconds to get the prices
        polling[POLLING.ORDERS] = setInterval(async () => {
            await fillOrders();
        }, POLLING.TIME.ORDERS);
    }

    function pollingBalances() {
        // Interval each 30 seconds to get the balances
        polling[POLLING.BALANCE] = setInterval(async () => {
            await getBalances();
        }, POLLING.TIME.BALANCE);
    }

    /**
     * Should return a orders matching
     * @returns {Order[]} list of all placed orders (bids and asks) no ordering required
     */
    function getPlacedOrders() {
        return orders;
    }

    function getBalances() {
        const balances = Object.keys(CURRENCY).map((symbol) =>
            getBalance(symbol, account, filledOrders)
        );
        balances.forEach(logBalance);
        return balances;
    }

    /**
     * Should return available balance of the symbol
     * Total balance - placed orders
     * @param {String} symbol, e.g. USD or ETH
     */
    function getBalance(symbol) {
        const costs = filledOrders.map((order) => order.getCost(symbol));
        return { [symbol]: account.getBalance(symbol)[symbol] + _.sum(costs) };
    }

    /**
     * trigger filling of orders which are in range
     * e.g. asks bellow bestAsk and bids above bestBid should be filled
     */
    async function fillOrders(symbol) {
        // Get prices
        const prices = await getOrderBook();
        const maxBid = prices.bid[0].price;
        const minAsk = prices.ask[0].price;
        for (let i = 0; i < orders.length; i++) {
            let currentOrder = orders[i];
            let validOrder =
                currentOrder.type === ORDER.BID
                    ? validateBid(
                          currentOrder,
                          maxBid,
                          getBalance(CURRENCY.USD, account, filledOrders)
                      )
                    : validateAsk(
                          currentOrder,
                          minAsk,
                          getBalance(CURRENCY.ETH, account, filledOrders)
                      );
            if (validOrder) {
                orders.splice(i, 1);
                currentOrder.timestamp = +new Date();
                filledOrders.push(currentOrder);
                logFilledOrder(currentOrder);
                i--;
            }
        }
    }

    return {
        start,
        getPlacedOrders,
        getBalance,
        fillOrders,
    };
};
