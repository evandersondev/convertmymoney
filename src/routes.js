const express = require("express");
const routes = express.Router();
const convertController = require("./controllers/convertController");

const convert = require("./lib/convert");
const apiBCB = require("./lib/api.bcb");

routes.get("/", async (req, res) => {
  const cotacao = await apiBCB.getCotacao();
  res.render("home", { cotacao });
});

routes.get("/price", convertController.price);

module.exports = routes;
