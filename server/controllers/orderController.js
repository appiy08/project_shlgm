const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const User = require('../models/userModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.checkout = async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    const user = await User.findById(userId);

    if (!cart) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    if (!user.address) {
      return res.status(400).json({ message: 'Address not found' });
    }

    const totalAmount = cart.items.reduce((acc, item) => acc + item.quantity * 10, 0); // Assuming each item costs $10

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // Amount in cents
      currency: 'usd',
      metadata: { userId }
    });

    const order = new Order({
      userId,
      items: cart.items,
      address: user.address,
      paymentIntentId: paymentIntent.id,
      amount: totalAmount
    });

    await order.save();
    await Cart.findByIdAndDelete(cart.id);

    res.status(200).json({ paymentIntent, order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
