const {Router} = require("express")
const {getAllUrls, generalUrl} = require("../controller/url.controller");

const urlsRoutes = Router()

urlsRoutes.get("/",getAllUrls)
.post("/generate", generalUrl)

module.exports = urlsRoutes