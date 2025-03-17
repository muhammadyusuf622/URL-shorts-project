const { Router } = require("express");
const {
  getAllUsers,
  register,
  deleteUser,
  login,
} = require("../controller/user.controller");

const userRouter = Router();

userRouter
  .get("/", getAllUsers)
  .post("/register", register)
  .post("/login", login)
  .delete("/:id", deleteUser);

module.exports = userRouter;