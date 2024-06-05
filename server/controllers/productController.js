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
const getProducts = async (req, res) => {
  const { category, brand } = req.query;
  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (brand) {
    filter.brand = brand;
  }

  if (category && brand) {
    filter.category = category;
    filter.brand = brand;
  }

  try {
    const products = await Product.find(filter);

    res.status(200).json({
      status: 200,
      message: "Product get successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).send({ message: "Error fetching products", error });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).json({
      status: 200,
      message: "Product get successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).send({ message: "Error fetching product", error });
  }
};

module.exports = { createProduct, getProducts, getProductById };
