const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

// Load env variables
dotenv.config();

const app = express();

//  Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(cors());
app.use(cookieParser());

//  Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//  Route imports
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

//  Use Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

//  Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

//  404 route
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

//  Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

//  Connect DB and start server
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log(' MongoDB connected');
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error(' MongoDB connection error:', err.message);
});
