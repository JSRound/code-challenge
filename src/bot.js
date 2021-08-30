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
    const polling = {};
    /**
     * Start the bot and place initial orders
     * Watch for changes and fill on interval
     */
    async function start() {
        // get prices
        const prices = await getOrderBook();

        // get price ranges

        // create random orders

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

    async function getBalances() {
        const balancesPromises = Object.values(CURRENCY).map(getBalance);
        const balances = Promise.all(balancesPromises);
        return balances;
    }

    /**
     * Should return available balance of the symbol
     * Total balance - placed orders
     * @param {String} symbol, e.g. USD or ETH
     */
    async function getBalance(symbol) {
        throw new Error('Not implemented');
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
