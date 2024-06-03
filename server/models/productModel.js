const mongoose = require("mongoose");
// Dependencies End
// Code Begin
const { Schema } = mongoose;

const productSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  reviews: {
    type: Number,
  },
  colors: [
    {
      type: String,
    },
  ],
  sizes: [
    {
      type: String,
    },
  ],
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  condition: {
    type: String,
  },
  gender: {
    type: String,
  },
  description: {
    type: String,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
