const {Router} = require("express")
const path = require("path")
const pageRoutes = Router();
const {readJSONFile} = require("../helpers/fs");
const { getRouteUrl } = require("../controller/url.controller");

pageRoutes.get("/", (req,res) => {
  res.render("index");
});

pageRoutes.get("/route/:code", getRouteUrl);

module.exports = pageRoutes;