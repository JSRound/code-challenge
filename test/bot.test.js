const makeBot = require('../src/bot');

describe('Bot', () => {
    let bot, mockOrderBook;
    beforeEach(async () => {
        mockOrderBook = jest.fn();
        bot = makeBot(mockOrderBook);
    });

    it('places orders after start', async () => {
        mockOrderBook.mockImplementation(async () => ({
            bid: [
                { price: 3225.1, quantity: 6, amount: 6.2821 },
                { price: 3205.1, quantity: 1, amount: 0.62477363 },
            ],
            ask: [
                { price: 3205.2, quantity: 7, amount: -9.84307936 },
                { price: 3225.2, quantity: 2, amount: -10.50651926 },
            ],
        }));

        await bot.start();
        const placedOrders = bot.getPlacedOrders();
        expect(placedOrders).toHaveLength(10);
        // Other test cases and conditions to follow
    });

});
