const mongoose = require("mongoose");
// End Dependencies

const AddressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      zip: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
