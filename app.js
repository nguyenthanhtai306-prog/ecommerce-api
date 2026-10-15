require("dotenv").config();

const express = require("express");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware đọc dữ liệu JSON
app.use(express.json());

// Routes xác thực người dùng
app.use("/api/auth", authRoutes);

// Routes quản lý sản phẩm
app.use("/api/products", productRoutes);

// Trang chủ API
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Ecommerce API is running",
    });
});

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy",
        message: "Ecommerce API is running",
    });
});

module.exports = app;