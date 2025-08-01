// routes/orderRoutes.js

const express = require('express');
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');

const protect = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

// Create a new order (user only)
router.post('/', protect, allowRoles('user'), createOrder);

//  Get logged-in user's orders (user only)
router.get('/my', protect, allowRoles('user'), getMyOrders);

//  Get all orders (admin only)
router.get('/', protect, allowRoles('admin'), getAllOrders);

//  Update order status (admin only)
router.put('/:id', protect, allowRoles('admin'), updateOrderStatus);

module.exports = router;
