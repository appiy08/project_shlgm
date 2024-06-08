const mongoose = require("mongoose");
// Dependencies End
// Code Begin
const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      size: { type: String, required: true },
      color: { type: String, required: true },
    },
  ],
  amount: { type: Number, required: true },
  addressId: { type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true },
  paymentIntentId: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

orderSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
