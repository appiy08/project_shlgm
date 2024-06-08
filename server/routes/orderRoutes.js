const express = require("express");
const {
  createOrder,
  verifyPayment,
} = require("../controllers/orderController");
// End Dependencies
const router = express.Router();

router.post("/create", createOrder);
router.post("/verify-payment", verifyPayment);

module.exports = router;
