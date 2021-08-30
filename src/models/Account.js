const { CURRENCY } = require('../constants');

class Account {
    constructor(assets = []) {
        this.balance = {};
        assets.map(this.loadOperation, this);
    }

    loadOperation({ currency, amount }) {
        this.balance[currency] = (this.balance[currency] || 0) + amount;
    }
    getBalance(symbol) {
        return { [symbol]: this.balance[symbol] || 0 };
    }

    getBalances() {
        const balanceList = Object.values(CURRENCY).map(this.getBalance, this);
        return Object.assign({}, ...balanceList);
    }
}

module.exports = Account;
