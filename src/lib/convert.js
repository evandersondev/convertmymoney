const convert = (price, quantity) => {
  return price * quantity;
};

const toMoney = valor => {
  return parseFloat(valor).toFixed(2);
};

module.exports = { convert, toMoney };
