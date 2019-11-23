const convert = require("../lib/convert");

module.exports = {
  price(req, res) {
    const { price, quantity } = req.query;
    if (price && quantity) {
      const convertion = convert.convert(price, quantity);
      res.render("price", {
        error: false,
        convertion: convert.toMoney(convertion),
        price: convert.toMoney(price),
        quantity: convert.toMoney(quantity)
      });
    } else {
      res.render("price", {
        error: "invalid value"
      });
    }
  }
};
