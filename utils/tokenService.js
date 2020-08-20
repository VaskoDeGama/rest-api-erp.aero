const jwt = require("jsonwebtoken");
const config = require("config");

const JWT_SECRET = config.get("JWT_SECRET");
const JWT_REFRESH_SECRET = config.get("JWT_REFRESH_SECRET");

const getAccessToken = (payload) => {
  return jwt.sign({ user: payload }, JWT_SECRET, { expiresIn: "10min" });
};

const getRefreshToken = (payload) => {
  return jwt.sign({ user: payload }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

module.exports = {
  getAccessToken,
  getRefreshToken,
};
