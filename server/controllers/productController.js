const multer = require("multer");
const Product = require("../models/productModel");
// Dependencies End

const createProduct = async (req, res) => {
  try {
    const product = req.body;

    const newProduct = { ...product };

    const savedProduct = await Product.create(newProduct);

    res.status(201).json({
      status: 200,
      message: "Product add successfully",
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createProduct };
