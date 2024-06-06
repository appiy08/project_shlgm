const express = require('express');
const { addToCart, getCart } = require('../controllers/cartController');
// End Dependencies 
const router = express.Router();

router.post('/add_to_cart', addToCart);
router.get('/:userId', getCart);

module.exports = router;
