const nanoid = require("nanoid");
const { SERVER_BASE_URL } = require("../config/url.config");
const pool = require("../config/db.config");

exports.getAllUrls = async (_, res) => {
  const allUrls = await pool.query(`SELECT * FROM urls`);

  res.send({
    message: "Success ✅",
    count: allUrls.rowCount,
    data: allUrls.rows,
  });
};

exports.generateUrl = async (req, res) => {
  const { originalUrl, userId } = req.body;

  const foundedUrl = await pool.query(
    `SELECT * FROM urls WHERE original_url = $1 AND user_id = $2`,
    [originalUrl, userId]
  );

  if (foundedUrl.rowCount) {
    return res.status(409).send({
      message: `Bu URLdan: ${originalUrl} allaqachon foydalangansiz`,
    });
  }

  let code = nanoid.nanoid(8);

  const newUrl = await pool.query(
    `INSERT INTO urls (original_url, code, user_id) VALUES ($1, $2, $3) RETURNING *`,
    [originalUrl, code, userId]
  );

  res.send({
    message: "ok",
    shortUrl: SERVER_BASE_URL + "route/" + newUrl.rows[0].code,
  });
};
