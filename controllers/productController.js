const prismaPromise = require("../utils/prisma");

// Lấy danh sách sản phẩm
const getProducts = async(req, res) => {
    try {
        const prisma = await prismaPromise;

        const products = await prisma.orm.public.Product.all();

        return res.status(200).json({
            message: "Lấy danh sách sản phẩm thành công",
            products,
        });
    } catch (error) {
        console.error("Lỗi lấy danh sách sản phẩm:", error);

        return res.status(500).json({
            message: "Không thể lấy danh sách sản phẩm",
        });
    }
};

// Lấy sản phẩm theo ID
const getProductById = async(req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "ID sản phẩm không hợp lệ",
            });
        }

        const prisma = await prismaPromise;

        const product = await prisma.orm.public.Product
            .where({ pid: id })
            .first();

        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }

        return res.status(200).json({
            product,
        });
    } catch (error) {
        console.error("Lỗi lấy sản phẩm:", error);

        return res.status(500).json({
            message: "Không thể lấy sản phẩm",
        });
    }
};

// Thêm sản phẩm
const createProduct = async(req, res) => {
    try {
        const { pname, price, quantity } = req.body;

        if (
            typeof pname !== "string" ||
            pname.trim() === "" ||
            price === undefined ||
            quantity === undefined
        ) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ tên, giá và số lượng sản phẩm",
            });
        }

        const parsedPrice = Number(price);
        const parsedQuantity = Number(quantity);

        if (!Number.isFinite(parsedPrice) ||
            parsedPrice < 0 ||
            !Number.isInteger(parsedQuantity) ||
            parsedQuantity < 0
        ) {
            return res.status(400).json({
                message: "Giá phải là số không âm và số lượng phải là số nguyên không âm",
            });
        }

        const prisma = await prismaPromise;

        const product = await prisma.orm.public.Product.create({
            pname: pname.trim(),
            price: parsedPrice,
            quantity: parsedQuantity,
        });

        return res.status(201).json({
            message: "Thêm sản phẩm thành công",
            product,
        });
    } catch (error) {
        console.error("Lỗi thêm sản phẩm:", error);

        return res.status(500).json({
            message: "Không thể thêm sản phẩm",
        });
    }
};

// Cập nhật sản phẩm
const updateProduct = async(req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "ID sản phẩm không hợp lệ",
            });
        }

        const { pname, price, quantity } = req.body;

        if (
            typeof pname !== "string" ||
            pname.trim() === "" ||
            price === undefined ||
            quantity === undefined
        ) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ tên, giá và số lượng sản phẩm",
            });
        }

        const parsedPrice = Number(price);
        const parsedQuantity = Number(quantity);

        if (!Number.isFinite(parsedPrice) ||
            parsedPrice < 0 ||
            !Number.isInteger(parsedQuantity) ||
            parsedQuantity < 0
        ) {
            return res.status(400).json({
                message: "Giá hoặc số lượng không hợp lệ",
            });
        }

        const prisma = await prismaPromise;

        const existingProduct = await prisma.orm.public.Product
            .where({ pid: id })
            .first();

        if (!existingProduct) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }

        // Dùng API ORM Prisma 8 RC để cập nhật bản ghi
        const product = await prisma.orm.public.Product
            .where({ pid: id })
            .update({
                pname: pname.trim(),
                price: parsedPrice,
                quantity: parsedQuantity,
            });

        return res.status(200).json({
            message: "Cập nhật sản phẩm thành công",
            product,
        });
    } catch (error) {
        console.error("Lỗi cập nhật sản phẩm:", error);

        return res.status(500).json({
            message: "Không thể cập nhật sản phẩm",
        });
    }
};

// Xóa sản phẩm
const deleteProduct = async(req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                message: "ID sản phẩm không hợp lệ",
            });
        }

        const prisma = await prismaPromise;

        const existingProduct = await prisma.orm.public.Product
            .where({ pid: id })
            .first();

        if (!existingProduct) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }

        const result = await prisma.orm.public.Product
            .where({ pid: id })
            .delete();

        return res.status(200).json({
            message: "Xóa sản phẩm thành công",
            result,
        });
    } catch (error) {
        console.error("Lỗi xóa sản phẩm:", error);

        return res.status(500).json({
            message: "Không thể xóa sản phẩm",
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};