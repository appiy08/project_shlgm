const express = require('express');
const multer = require('multer');
const path = require('path');
const { handleUpload } = require('../controllers/uploadController');

const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Define the upload route
router.post('/upload', upload.single('image'), handleUpload);

module.exports = router;
