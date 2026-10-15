const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

// Middleware xác thực JWT
const authMiddleware = require("../middleware/authMiddleware");

// API đăng ký
router.post("/register", register);

// API đăng nhập
router.post("/login", login);

// API kiểm tra token
router.get("/me", authMiddleware, (req, res) => {
    return res.status(200).json({
        message: "Xác thực token thành công",
        user: req.user,
    });
});

module.exports = router;