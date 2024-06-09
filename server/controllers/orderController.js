const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const User = require("../models/userModel");
// Dependencies End
// Code Begin
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  const { userId, addressId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    const userAddress = await User.findOne({ _id: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }
  
    if (!userAddress) {
      return res.status(400).json({ error: "No addresses found for the user" });
    }

    const address = userAddress.addresses.id(addressId);

    if (!address) {
      return res.status(400).json({ error: "Address not found" });
    }

    const totalAmountInINR = cart.items.reduce(
      (total, item) => total + item.quantity * 1000,
      0
    );
    const totalAmountInPaise = totalAmountInINR * 100;

    const options = {
      amount: totalAmountInPaise,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const newOrder = new Order(
      {
        userId,
        items: cart.items,
        address: address, // Store the full address object
        amount: totalAmountInINR,
        paymentIntentId: order.id,
      },
      { addressId: false }
    );

    await newOrder.save();
    cart.items = [];
    await cart.save();

    res.status(200).json({
      status: 200,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  const { paymentId, orderId, signature } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(orderId + "|" + paymentId)
    .digest("hex");

  if (generatedSignature === signature) {
    await Order.findOneAndUpdate(
      { paymentIntentId: orderId },
      { status: "completed" },
      { new: true }
    );
    res.status(200).json({ status: "success" });
  } else {
    res
      .status(400)
      .json({ status: "failure", message: "Payment verification failed" });
  }
};

module.exports = { createOrder, verifyPayment };
