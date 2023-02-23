const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

const NOT_AUTH = { message: "Not authorized, token failed" };
const NOT_AUTH_NO_TOKEN = { message: "Not authorized, no token" };

async function getUser(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return { status: 401, response: NOT_AUTH_NO_TOKEN };
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");

      return { status: 200, response: user };
    } catch (error) {
      console.log(error);

      return { status: 401, message: NOT_AUTH };
    }
  }
  return { status: 401, message: NOT_AUTH };
}

module.exports = { getUser, notAuthorizedMessage: NOT_AUTH };
