// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const upload = require('../middleware/upload');

const protect = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

//  Add product (admin)
router.post('/', protect, allowRoles('admin'),upload.single('image'), createProduct);

//  Get all products (public)
router.get('/', getAllProducts);

//  Get product by ID (public)
router.get('/:id', getProductById);

//  Update product (admin)
router.put('/:id', protect, allowRoles('admin'),upload.single('image'), updateProduct);

//  Delete product (admin)
router.delete('/:id', protect, allowRoles('admin'), deleteProduct);

module.exports = router;
