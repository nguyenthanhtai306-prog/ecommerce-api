# Ecommerce API

RESTful API cho hệ thống thương mại điện tử, xây dựng bằng Node.js, Express.js, Prisma và PostgreSQL.

## 1. Công nghệ sử dụng

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Docker và Docker Compose
- Postman để kiểm thử API

## 2. Chức năng

- Đăng ký tài khoản
- Đăng nhập bằng JWT
- Xác thực người dùng
- Xem danh sách sản phẩm
- Xem chi tiết sản phẩm
- Thêm sản phẩm
- Cập nhật sản phẩm
- Xóa sản phẩm
- Kiểm tra tình trạng hoạt động của API

## 3. Chạy dự án bằng Docker

Yêu cầu: đã cài Docker Desktop.

Clone repository:

```bash
git clone https://github.com/nguyenthanhtai306-prog/ecommerce-api.git
cd ecommerce-api
```

Tạo file `.env` ở thư mục gốc:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecommerce_db"
JWT_SECRET="thay_bang_chuoi_bi_mat_manh"
PORT=3000
```

Khởi động hệ thống:

```bash
docker compose up -d --build
```

Kiểm tra trạng thái:

```bash
docker compose ps
```

API mặc định chạy tại `http://localhost:3000`.

## 4. API Endpoints

### Authentication

| Method | Endpoint | Chức năng |
|---|---|---|
| POST | `/api/auth/register` | Đăng ký |
| POST | `/api/auth/login` | Đăng nhập |
| GET | `/api/auth/me` | Thông tin người dùng đã xác thực |

### Products

| Method | Endpoint | Chức năng |
|---|---|---|
| GET | `/api/products` | Danh sách sản phẩm |
| GET | `/api/products/:id` | Chi tiết sản phẩm |
| POST | `/api/products` | Thêm sản phẩm |
| PUT | `/api/products/:id` | Cập nhật sản phẩm |
| DELETE | `/api/products/:id` | Xóa sản phẩm |

### Health Check

`GET /health` — kiểm tra trạng thái API.

## 5. Kiểm thử

Sử dụng Postman để gửi request đến `http://localhost:3000`.

Ví dụ thêm sản phẩm:

```json
{
  "pname": "Ban phim co",
  "price": 450000,
  "quantity": 15
}
```

## 6. Dừng hệ thống

```bash
docker compose down
```

Dữ liệu PostgreSQL được lưu trong Docker volume nên vẫn được giữ lại khi chỉ chạy lệnh trên.

## 7. Bảo mật

- Không commit file `.env` lên GitHub.
- Sử dụng JWT để xác thực người dùng.
- Không lưu mật khẩu dưới dạng văn bản thuần.
