const express = require("express");
const { APP_PORT } = require("./config/app.config");
const userRouter = require("./routes/user.routes");
const pageRoutes = require("./routes/page.routes");
const urlsRoutes = require("./routes/url.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use("/", pageRoutes)

app.use("/api/users",userRouter)
app.use("/api/urls",urlsRoutes)

app.listen(APP_PORT, () => {

  console.log(`http://localhost:${APP_PORT}`)
})