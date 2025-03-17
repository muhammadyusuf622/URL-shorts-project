const pool = require("../config/db.config");

exports.getAllUsers = async (req, res) => {
  const users = await pool.query(`SELECT * FROM users`);

  res.send({
    message: "Success ✅",
    count: users.rowCount,
    data: users.rows,
  });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  const foundedUser = await pool.query(
    `SELECT * FROM users WHERE email = $1 AND password = $2`,
    [email, password]
  );

  if (foundedUser.rowCount) {
    res.status(409).send({
      message: "Bunday email va passwordlik user allaqachon bor",
    });
    return;
  }

  await pool.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
    [name, email, password]
  );

  // res.redirect("/");

  res.status(201).send({
    message: "Ro'yhatdan o'tkazildi✅"
  })
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const foundedUser = await pool.query(
    `SELECT * FROM users WHERE email = $1 AND password = $2`,
    [email, password]
  );

  if (!foundedUser.rowCount) {
    res.status(404).send({
      message: "Bunday foydalanuvchi mavjud emas!",
    });
    return;
  }

  // res.redirect("/");

  res.send({
    message: "Success✅",
    data: foundedUser.rows
  })
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    res.status(400).send({
      message: `Given ID: ${id} is not a number`,
    });
    return;
  }

  await pool.query(`DELETE FROM users WHERE id = $1`, [id])

  res.status(204).send();
};
