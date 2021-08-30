const { PRICE } = require('../constants');

const formatPrice = ([price, quantity, amount]) => ({
    [PRICE.PRICE]: price,
    [PRICE.QUANTITY]: quantity,
    [PRICE.AMOUNT]: amount,
});

module.exports = {
    formatPrice,
};
