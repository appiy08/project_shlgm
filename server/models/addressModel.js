const mongoose = require("mongoose");
// Dependencies End 
// Define Address Schema
const AddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    addresses: [
      {
        name: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        zip: { type: String, required: true }, // Changed to String to accommodate different formats
        phone: { type: String, required: true }, // Added phone field
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
