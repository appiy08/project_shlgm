const Cart = require("../models/cartModel");
const { get, findIndex } = require("lodash");
// Dependencies End
// Code Begin
// Items Added To Cart
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
// Get Cart Items
const getCart = async (req, res) => {
  const { userId } = req.params;

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

// Remove Item from Cart
const removeCartItem = async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = findIndex(get(cart, "items", []), function (o) {
      return o.itemId == itemId;
    });
    console.log("itemIndex <<<>>>", itemIndex);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.items.splice(itemIndex, 1); // Remove the item from the array
    await cart.save();

    res.status(200).json({
      status: 200,
      message: "Item removed successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToCart, getCart, removeCartItem };
