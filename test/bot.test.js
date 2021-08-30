const makeBot = require('../src/bot');
const Account = require('../src/models/Account');
const Order = require('../src/models');
const { CURRENCY} = require('../src/constants')

describe('Bot', () => {
    let bot, mockOrderBook;
    beforeEach(async () => {
        mockOrderBook = jest.fn();
        bot = makeBot(mockOrderBook);
    });

    it('places orders after start', async () => {
        mockOrderBook.mockImplementation(async () => ({
            bid: [3, 4, 5],
            ask: [1, 2],
        }));

        await bot.start();
        const placedOrders = await bot.getPlacedOrders();
        expect(placedOrders).toHaveLength(10);
        // Other test cases and conditions to follow
    });

    describe('getBalance', () => {
      it('gets ETH symbol, an account with 10 ETH and some ask filled orders with a sum up of 9 ETH, returns 1 ETH', () => {
          const account = new Account([
              { currency: CURRENCY.ETH, amount: 10 },
              { currency: CURRENCY.USD, amount: 2000 },
          ]);
          const filledOrders = [
              new Order(1000, 3, 'ask'),
              new Order(1000, 3, 'ask'),
              new Order(1000, 3, 'ask'),
          ];
          const result = bot.getBalance(CURRENCY.ETH, account, filledOrders);
          expect(result).toEqual({ [CURRENCY.ETH]: 1 });
      });
      it(`gets ETH symbol, an account with 10 ETH and some ask filled orders with a sum up of 9 ETH
       and some bid filled orders with a sum up of 3 ETH, returns 4 ETH`, () => {
          const account = new Account([
              { currency: CURRENCY.ETH, amount: 10 },
              { currency: CURRENCY.USD, amount: 2000 },
          ]);
          const filledOrders = [
              new Order(1000, 3, 'ask'),
              new Order(1000, 3, 'ask'),
              new Order(1000, 3, 'ask'),
              new Order(1000, 1, 'bid'),
              new Order(1000, 2, 'bid'),
          ];
          const result = bot.getBalance(CURRENCY.ETH, account, filledOrders);
          expect(result).toEqual({ [CURRENCY.ETH]: 4 });
      });
      it(`gets USD symbol, an account with 2000 USD and some ask filled orders with a sum up of 1000 USD, returns 3000 USD`, () => {
          const account = new Account([
              { currency: CURRENCY.ETH, amount: 10 },
              { currency: CURRENCY.USD, amount: 2000 },
          ]);
          const filledOrders = [
              new Order(100, 2, 'ask'),
              new Order(100, 2, 'ask'),
              new Order(200, 3, 'ask'),
          ];
          const result = bot.getBalance(CURRENCY.USD, account, filledOrders);
          expect(result).toEqual({ [CURRENCY.USD]: 3000 });
      });
      it(`gets USD symbol, an account with 2000 USD and some ask filled orders with a sum up of 1000 USD, 
      and some bid orders with a sum up of 2500, returns 500 USD`, () => {
          const account = new Account([
              { currency: CURRENCY.ETH, amount: 10 },
              { currency: CURRENCY.USD, amount: 2000 },
          ]);
          const filledOrders = [
              new Order(100, 2, 'ask'),
              new Order(100, 2, 'ask'),
              new Order(200, 3, 'ask'),
              new Order(1000, 2, 'bid'),
              new Order(500, 1, 'bid'),
          ];
          const result = bot.getBalance(CURRENCY.USD, account, filledOrders);
          expect(result).toEqual({ [CURRENCY.USD]: 500 });
      });
  });
});
