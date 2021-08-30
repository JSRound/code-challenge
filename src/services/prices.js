const { ORDER } = require('../constants');
// within 5% of the best bid and best ask prices
const delta = 0.05;

const getEdgeValues = (list) => [list[0], list[list.length - 1]];
const getDeltaValues = (max, min, delta) => {
    const range = (max - min) * delta;
    return { top: max, bottom: max - range };
};

const getEdgePrices = (prices) => {
    const [maxBid, minBid] = getEdgeValues(prices[ORDER.BID]);
    const bidDeltaValues = getDeltaValues(maxBid.price, minBid.price, delta);

    const [minAsk, maxAsk] = getEdgeValues(prices[ORDER.ASK]);
    const askDeltaValues = getDeltaValues(minAsk.price, maxAsk.price, delta);
    return {
        [ORDER.BID]: bidDeltaValues,
        [ORDER.ASK]: askDeltaValues,
    };
};

module.exports = {
    getEdgePrices,
    getDeltaValues,
    getEdgeValues,
};
