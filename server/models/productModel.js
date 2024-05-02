const mongoose = require("mongoose");
// Dependencies End
// Code Begin 
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }, // You can replace this with a rich text editor field
  price: { type: Number, required: true },
  category: { type: String },
  brand: { type: String },
  condition: { type: String, enum: ["new", "used - like new", "used - good"] },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  images: [{ type: String }], // Array of image URLs
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
