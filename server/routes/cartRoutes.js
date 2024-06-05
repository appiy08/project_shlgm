const express = require('express');
const { addToCart, getCart } = require('../controllers/cartController');
const router = express.Router();

router.post('/add_to_cart', addToCart);
router.get('/cart/:userId', getCart);

module.exports = router;
