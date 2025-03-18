const { Router } = require("express");
const pool = require("../config/db.config");

const pageRoutes = Router();

pageRoutes.get("/", (req, res) => {
  res.render("index");
});

pageRoutes.get("/route/:code", async (req, res) => {
  const { code } = req.params;

  const foundedUrl = await pool.query(`SELECT * FROM urls WHERE code = $1`, [
    code,
  ]);

  if (foundedUrl.rowCount == 0) {
    return res.status(404).send({
      message: "URL not found",
    });
  }

  await pool.query(
    `UPDATE urls SET viewers_count = viewers_count + 1 WHERE code = $1`,
    [code]
  );

  res.redirect(foundedUrl.rows[0].original_url);
});

module.exports = pageRoutes;
