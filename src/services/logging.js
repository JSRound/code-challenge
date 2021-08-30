const formatBalance = (balance) => {
    const [symbol, amount] = Object.entries(balance)[0];
    return `${symbol}: ${amount}`;
};
const logBalance = (arg) => console.log(formatBalance(arg));



module.exports = {
    logBalance,
    formatBalance
};