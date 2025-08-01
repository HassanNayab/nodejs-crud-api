// controllers/userController.js

const User = require('../models/User');

//  Logged-in user profile
exports.getMyProfile = async (req, res) => {
  res.status(200).json({
    message: 'User profile',
    user: req.user, // set by authMiddleware
  });
};

//  Admin: Get all users
exports.getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.status(200).json({
    message: 'All users',
    users,
  });
};
