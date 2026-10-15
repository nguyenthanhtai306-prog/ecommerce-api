const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prismaPromise = require("../utils/prisma");

// ĐĂNG KÝ TÀI KHOẢN
const register = async(req, res) => {
    try {
        const { username, fullname, password } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!username || !fullname || !password) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ thông tin",
            });
        }

        const prisma = await prismaPromise;

        // Kiểm tra username đã tồn tại chưa
        const existingUser = await prisma.orm.public.User
            .where({ username })
            .first();

        if (existingUser) {
            return res.status(409).json({
                message: "Tên đăng nhập đã tồn tại",
            });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo tài khoản mới
        const newUser = await prisma.orm.public.User.create({
            username,
            fullname,
            password: hashedPassword,
            roleid: 1,
            mid: 1,
        });

        return res.status(201).json({
            message: "Đăng ký thành công",
            user: {
                uid: newUser.uid,
                username: newUser.username,
                fullname: newUser.fullname,
            },
        });
    } catch (error) {
        console.error("Lỗi đăng ký:", error);

        return res.status(500).json({
            message: "Không thể đăng ký tài khoản",
        });
    }
};

// ĐĂNG NHẬP
const login = async(req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Vui lòng nhập tên đăng nhập và mật khẩu",
            });
        }

        const prisma = await prismaPromise;

        // Tìm tài khoản
        const user = await prisma.orm.public.User
            .where({ username })
            .first();

        if (!user) {
            return res.status(401).json({
                message: "Tên đăng nhập hoặc mật khẩu không đúng",
            });
        }

        // So sánh mật khẩu
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Tên đăng nhập hoặc mật khẩu không đúng",
            });
        }

        // Kiểm tra JWT_SECRET
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET chưa được cấu hình");
        }

        // Tạo JWT token
        const token = jwt.sign({
                uid: user.uid,
                username: user.username,
                roleid: user.roleid,
            },
            process.env.JWT_SECRET, { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Đăng nhập thành công",
            token,
            user: {
                uid: user.uid,
                username: user.username,
                fullname: user.fullname,
            },
        });
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);

        return res.status(500).json({
            message: "Không thể đăng nhập",
        });
    }
};

module.exports = {
    register,
    login,
};