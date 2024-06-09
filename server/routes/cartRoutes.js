const express = require("express");
const {
  addToCart,
  getCart,
  removeCartItem,
} = require("../controllers/cartController");
// End Dependencies
const router = express.Router();

router.post("/add_to_cart", addToCart);
router.get("/:userId", getCart);
router.post("/remove_item", removeCartItem);

module.exports = router;
