const express = require("express");
// Controller Functions
const { userLogin, userSignup } = require("../controllers/authController");
// Dependencies End
// Code Begin

const router = express.Router();

// Login
router.post("/login", userLogin);

// Signup
router.post("/signup", userSignup);

module.exports = router;
