const { get, split } = require("lodash");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware for user authentication
const userAuthentication = async (req, res, next) => {
  try {
    // Extract the authorization header
    const authorization = get(req, "headers.authorization", "");

    // Check if authorization header is present
    if (!authorization) {
      return res.status(401).json({ error: "Authorization token is required" });
    }

    // Extract the token from the authorization header
    const token = split(authorization, " ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Find the user by ID
    const user = await User.findOne({ _id: decoded._id }).select("_id");

    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Attach the user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in UserAuthentication middleware:", error);
    return res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = userAuthentication;
