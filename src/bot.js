const { getEdgePrices } = require('./services/prices');
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
    async function getPlacedOrders() {
        throw new Error('Not implemented');
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
        throw new Error('Not implemented');
    }

    return {
        start,
        getPlacedOrders,
        getBalance,
        fillOrders,
    };
};
