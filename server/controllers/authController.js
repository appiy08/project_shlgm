const jwt = require("jsonwebtoken");
const { get, set, omit } = require("lodash");
// Model
const User = require("../models/userModel");
// Dependencies End
// Code Begin

// Create Token Function
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
};

// Login Auth
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Create Token
    const token = createToken(get(user, "_id", ""));
    const result = set(
      { ...omit(get(user, "_doc", {}), ["password"]) },
      "token",
      token
    );

    res.status(200).json({
      status: 200,
      message: "User logged in successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ status: 400, error: error.message, data: null });
  }
};

// Signup Auth
const userSignup = async (req, res) => {
  const reqData = req.body;

  try {
    const user = await User.signup(reqData);

    // Create Token
    const token = createToken(get(user, "_id", ""));
    const result = set(
      { ...omit(get(user, "_doc", {}), ["password"]) },
      "token",
      token
    );

    res.status(200).json({
      status: 200,
      message: "User signed up successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ status: 400, error: error.message, data: null });
  }
};

module.exports = { userLogin, userSignup };
