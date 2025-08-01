// controllers/orderController.js

const Order = require('../models/Order');
const Product = require('../models/Product');

//  Create new order (user)
exports.createOrder = async (req, res) => {
  try {
    const { products } = req.body;

    // Calculate total price
    let totalPrice = 0;

    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      totalPrice += product.price * item.quantity;
    }

    const order = await Order.create({
      user: req.user._id,
      products,
      totalPrice,
    });

    res.status(201).json({
      message: 'Order placed successfully',
      order,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create order', error: err.message });
  }
};

//  Get logged-in user's orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('products.product');
    res.status(200).json({
      message: 'Your orders',
      orders,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

//  Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('products.product');
    res.status(200).json({
      message: 'All orders',
      orders,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

//  Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.status(200).json({
      message: 'Order status updated',
      order,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status', error: err.message });
  }
};
