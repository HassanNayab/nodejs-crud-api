# Club & Society Management System – Backend API (MERN Stack)

## 📌 Overview
This backend API is built using Node.js, Express, MongoDB, and Mongoose for managing users, products (e.g., club items), and orders (event participation). It includes JWT-based authentication, role-based access control, and secure file uploads using Multer.

## 🚀 Features
- User registration & login (JWT + bcrypt)
- Admin/User roles with RBAC
- Product management (CRUD + image upload)
- Order creation & tracking
- Secure route protection with middleware

## 🔧 Technologies Used
- Node.js + Express.js
- MongoDB + Mongoose
- JWT & bcryptjs for Auth
- Multer for file upload
- dotenv, cookie-parser, cors

## 📂 Project Structure
📦 backend/
├── controllers/
├── models/
├── routes/
├── middleware/
├── uploads/
├── server.js
├── .env

bash
Copy
Edit

## ⚙️ Setup Instructions

1. Clone the repo  
   `git clone https://github.com/yourusername/club-api.git`

2. Install dependencies  
   `npm install`

3. Add `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/clubdb
JWT_SECRET=your_jwt_secret
Run server:
node server.js

📮 API Endpoints
👤 User
POST /api/users/register

POST /api/users/login

GET /api/users/me

📦 Product
POST /api/products (admin)

GET /api/products

GET /api/products/:id

🛒 Orders
POST /api/orders (user)

GET /api/orders/my-orders

GET /api/orders (admin)

🖼 Upload
POST /api/upload

🔐 Middleware
authMiddleware (JWT protect)

roleMiddleware (admin/user)

upload.js (Multer config)
