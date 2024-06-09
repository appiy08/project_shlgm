const express = require("express");
const {
  getUser,
  updateUser,
  deleteUser,
  addAddress,
  getAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../controllers/userController");
// Dependencies End 
const router = express.Router();

router.get("/:userId", getUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
router.post("/address", addAddress);
router.get("/address/:userId", getAddress);
router.delete("/address/:userId/:addressId", deleteAddress);
router.post("/default-address", setDefaultAddress);

module.exports = router;
