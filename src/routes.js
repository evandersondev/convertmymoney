const express = require("express");
const routes = express.Router();
const convertController = require("./controllers/convertController");

routes.get("/", (req, res) => {
  res.render("home");
});

routes.get("/price", convertController.price);

module.exports = routes;
