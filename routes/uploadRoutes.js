// routes/uploadRoutes.js

const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload');
const { uploadProductImage } = require('../controllers/uploadController');

const protect = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

// Upload product image (admin only)
router.post(
  '/product-image',
  protect,
  allowRoles('admin'),
  upload.single('image'), // "image" should match the field name in Postman/form
  uploadProductImage
);

module.exports = router;
