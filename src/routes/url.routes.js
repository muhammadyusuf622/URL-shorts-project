const { Router } = require("express");
const { getAllUrls, generateUrl } = require("../controller/url.controller");

const urlRoutes = Router();

urlRoutes
    .get("/", getAllUrls)
    .post("/generate", generateUrl);

module.exports = urlRoutes;