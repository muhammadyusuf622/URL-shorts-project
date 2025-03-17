const path = require("node:path");
const nanoid = require("nanoid");
const { readJSONFile, writeJSONFile } = require("../helpers/fs");
const { SERVER_BASE_URL } = require("../config/url.config");

exports.getAllUrls = (_, res) => {
  const filePath = path.join(__dirname, "..", "data", "urls.json");
  const allUrls = readJSONFile(filePath);

  res.send({
    data: allUrls,
  });
};

exports.generateUrl = (req, res) => {
  const { originalUrl, userId } = req.body;

  const filePath = path.join(__dirname, "..", "data", "urls.json");
  const allUrls = readJSONFile(filePath);

  const foundedUrl = allUrls.find((url) => url.originalUrl == originalUrl);

  if (foundedUrl) {
    return res.status(409).send({
      message: `Bu URL: ${originalUrl} allaqachon foydalanilgan`,
    });
  }

  let code = nanoid.nanoid(8);

  const newUrl = {
    id: allUrls.at(-1)?.id + 1 || 1,
    originalUrl,
    code,
    userId,
    createdAt: Date.now(),
    viewersCount: 0,
  };

  allUrls.push(newUrl);

  writeJSONFile(filePath, allUrls);

  res.send({
    message: "ok",
    shortUrl: SERVER_BASE_URL + "route/" + code,
  });
};
