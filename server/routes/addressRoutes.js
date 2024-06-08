const express = require("express");
const {
  getAddress,
  addAddress,
  deleteAddress,
} = require("../controllers/addressController");
// End Dependencies
const router = express.Router();

// Add Address Route
router.post("/", addAddress);
// Get Address Route
router.get("/:userId", getAddress);
// Delete Address Route
router.delete("/:userId/:addressId", deleteAddress);

module.exports = router;
