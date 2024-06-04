const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
} = require("../controllers/productController");
// Dependencies End
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/create", createProduct);

module.exports = router;
