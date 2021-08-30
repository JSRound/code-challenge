const formatBalance = (balance) => {
    const [symbol, amount] = Object.entries(balance)[0];
    return `${symbol}: ${amount}`;
};
const logBalance = (arg) => console.log(formatBalance(arg));

function logFilledBid(order) {
    console.log(
        `FILLED BID @ ${order.price} ${order.amount} (ETH + ${
            order.amount
        } USD - ${order.price * order.amount})`
    );
}
function logFilledAsk(order) {
    console.log(
        `FILLED ASK @ ${order.price} ${order.amount} (ETH - ${
            order.amount
        } USD + ${order.price * order.amount})`
    );
}
const logFilledOrder = (order) => {
    if (order.type === 'bid') {
        logFilledBid(order);
    } else {
        logFilledAsk(order);
    }
};
const logPlacedOrder = (order) => {
    console.log(`PLACE ${order.type.toUpperCase()} @ ${order.price} ${order.amount}`);
};

module.exports = {
    logBalance,
    formatBalance,
    logFilledOrder,
    logPlacedOrder
};
