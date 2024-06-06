const Cart = require("../models/cartModel");

const addToCart = async (req, res) => {
  const { userId, itemId, quantity, size, color } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ itemId, quantity, size, color }] });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.itemId.toString() === itemId
      );

      if (itemIndex > -1) {
        // If the item exists in the cart, update the quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If the item does not exist in the cart, add it with all required fields
        cart.items.push({ itemId, quantity, size, color });
      }
    }

    await cart.save();

    res.status(200).json({
      status: 200,
      message: "Item added to cart successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  const { userId } = req.params;
  console.log(`Fetching cart for userId: ${userId}`);

  try {
    const cart = await Cart.findOne({ userId }).populate("items.itemId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({
      status: 200,
      message: "Cart retrieved successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToCart, getCart };
