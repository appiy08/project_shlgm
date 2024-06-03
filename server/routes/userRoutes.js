const express = require("express");
// Controller Functions
const { getUser } = require("../controllers/userController");
// Dependencies End
// Code Begin
const router = express.Router();

router.post("/user", getUser);

module.exports = router;