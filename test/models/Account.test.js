const Account = require('../../src/models/Account');
const { CURRENCY } = require('../../src/constants');

describe('Account', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('constructor', () => {
        it('gets assets and return an object with the balance filled with the asset information', () => {
            const assets = [
                { currency: CURRENCY.ETH, amount: 10 },
                { currency: CURRENCY.USD, amount: 2000 },
            ];
            const loadSpy = jest.spyOn(Account.prototype, 'loadOperation');
            const account = new Account(assets);
            expect(account.balance).toEqual({
                [CURRENCY.ETH]: 10,
                [CURRENCY.USD]: 2000,
            });
            expect(loadSpy.mock.calls).toEqual([
                [{ currency: 'ETH', amount: 10 }, 0, assets],
                [{ currency: 'USD', amount: 2000 }, 1, assets],
            ]);
        });
    });
    describe('getBalance', () => {
        it('gets an account with ETH & USD, getBalance for ETH', () => {
            const assets = [
                { currency: CURRENCY.ETH, amount: 10 },
                { currency: CURRENCY.USD, amount: 2000 },
            ];
            const account = new Account(assets);
            const balance = account.getBalance(CURRENCY.ETH);
            expect(balance).toEqual({ [CURRENCY.ETH]: 10 });
        });

        it('gets an account with ETH & USD, getBalance for USD', () => {
            const assets = [
                { currency: CURRENCY.ETH, amount: 10 },
                { currency: CURRENCY.USD, amount: 2000 },
            ];
            const account = new Account(assets);
            const balance = account.getBalance(CURRENCY.USD);
            expect(balance).toEqual({ [CURRENCY.USD]: 2000 });
        });
    });

    describe('getBalances', () => {
        it('gets the balances for all the currencies', () => {
            const assets = [
                { currency: CURRENCY.ETH, amount: 10 },
                { currency: CURRENCY.USD, amount: 2000 },
            ];
            const account = new Account(assets);
            const balances = account.getBalances();
            expect(balances).toEqual({
                [CURRENCY.ETH]: 10,
                [CURRENCY.USD]: 2000,
            });
        });
    });
});
