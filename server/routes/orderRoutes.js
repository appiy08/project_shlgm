const express = require("express");
const { checkout, webhook } = require("../controllers/orderController");
// End Dependencies 
const router = express.Router();

router.post("/checkout", checkout);
router.post("/webhook", express.raw({ type: "application/json" }), webhook);

module.exports = router;
