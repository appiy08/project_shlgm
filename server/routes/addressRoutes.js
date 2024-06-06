const express = require('express');
const { getAddress, addAddress } = require('../controllers/addressController');
// End Dependencies 
const router = express.Router();

router.post('/', addAddress);
router.get('/:userId', getAddress);

module.exports = router;
