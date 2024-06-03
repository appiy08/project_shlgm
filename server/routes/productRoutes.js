const express = require("express");
const { createProduct } = require("../controllers/productController");
// Dependencies End
const router = express.Router();

router.post("/create", createProduct);

module.exports = router;
