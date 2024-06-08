const { body, validationResult } = require("express-validator");

const validateAddress = [
  body("userId").isMongoId().withMessage("Invalid user ID"),
  body("address.name").notEmpty().withMessage("Name is required"),
  body("address.address").notEmpty().withMessage("Address is required"),
  body("address.city").notEmpty().withMessage("City is required"),
  body("address.state").notEmpty().withMessage("State is required"),
  body("address.country").notEmpty().withMessage("Country is required"),
  body("address.zip").notEmpty().withMessage("ZIP code is required"),
  body("address.phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateAddress;
