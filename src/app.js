const express = require("express");
const userRouter = require("./routes/user.routes");
const pageRoutes = require("./routes/page.routes");
const urlRoutes = require("./routes/url.routes");
const path = require("path")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));

// statik file berib yuborish
app.use("/public", express.static(path.join(process.cwd(), "src", "public")));

app.use("/", pageRoutes);
app.use("/api/users", userRouter);
app.use("/api/urls", urlRoutes);

app.all("/*", (req, res) => {
  res.status(404).send({
    message: `Given URL: ${req.url} is not found`,
  });
});

module.exports = app