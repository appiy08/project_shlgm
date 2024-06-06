const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const User = require("../models/userModel");
const Address = require("../models/addressModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const checkout = async (req, res) => {
  const { userId } = req.body;

  try {
    // Fetch cart and address
    const cart = await Cart.findOne({ userId });
    const address = await Address.findOne({ userId });

    // Validate cart and address
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    if (!address) {
      return res.status(400).json({ error: "Address not found" });
    }

    // Calculate total amount in INR (example: each item costs 1000 INR)
    const totalAmountInINR = cart.items.reduce(
      (total, item) => total + item.quantity * 1000,
      0
    );
    const totalAmountInPaise = totalAmountInINR * 100; // Convert to paise

    // Create a Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmountInPaise, // Amount in paise
      currency: "inr",
      metadata: { userId },
    });

    // Create a new order
    const order = new Order({
      userId,
      items: cart.items,
      address: address.address,
      paymentIntentId: paymentIntent.id,
    });

    // Save the order and clear the cart
    await order.save();
    cart.items = [];
    await cart.save();

    // Respond with the payment intent and order details
    res.status(200).json({
      status: 200,
      message: "Item order successfully",
      data: { paymentIntent, order },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    const userId = paymentIntent.metadata.userId;

    await Order.findOneAndUpdate(
      { paymentIntentId: paymentIntent.id },
      { status: "completed" },
      { new: true }
    );
  }

  res.status(200).json({
    received: true,
  });
};

module.exports = { checkout, webhook };
