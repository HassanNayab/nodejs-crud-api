// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { getMyProfile, getAllUsers } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');
const allowRoles = require('../middleware/roleMiddleware');

//  GET /api/users/me → Logged-in user profile
router.get('/me', protect, getMyProfile);

// GET /api/users → Admin can see all users
router.get('/', protect, allowRoles('admin'), getAllUsers);

module.exports = router;
