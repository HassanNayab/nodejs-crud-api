// controllers/productController.js

const Product = require('../models/Product');

//  Create product (admin only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      image: req.file ? req.file.filename : 'default.jpg' // 👈 image filename yahan save ho raha hai
    });

    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err.message });
  }
};

//  Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: 'All products',
      products,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err.message });
  }
};

//  Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({
      message: 'Product found',
      product,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err.message });
  }
};

//  Update product (admin only)
exports.updateProduct = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    //  If new image uploaded, update it too
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({
      message: 'Product updated',
      product,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating product', error: err.message });
  }
};

//  Delete product (admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err.message });
  }
};
