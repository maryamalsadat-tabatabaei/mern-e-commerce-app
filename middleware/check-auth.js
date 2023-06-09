const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
require("dotenv").config;

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; //Authorization: 'Bearer token'
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SALT);
    req.userData = { userId: decodedToken.userId };
    return next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).end();
    }
    const error = new HttpError("Authentication failed!", 403);
    return next(error);
  }
};
