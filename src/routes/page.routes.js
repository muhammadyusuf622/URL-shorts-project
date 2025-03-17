const path = require("node:path");
const { Router } = require("express");
const { readJSONFile } = require("../helpers/fs");

const pageRoutes = Router();

pageRoutes.get("/", (req, res) => {
  res.render("index");
});

pageRoutes.get("/route/:code", (req, res) => {
  const { code } = req.params;

  const filePath = path.join(__dirname, "..", "data", "urls.json");
  const allUrls = readJSONFile(filePath);

  const foundedUrl = allUrls.find((url) => url.code === code);

  if (!foundedUrl) {
    return res.status(404).send({
      message: "URL not found",
    });
  }

  res.redirect(foundedUrl.originalUrl);
});

module.exports = pageRoutes;
