


# Hướng dẫn Setup Dự án Weblog

## Yêu cầu Hệ thống

- Node.js và npm được cài đặt trên máy tính của bạn.

## Bước 1: Clone Repository

Clone repository này từ GitHub :

```bash
git clone https://github.com/TruongCaoThanhNhat/WebBlog.git
```

## Bước 2: Cài đặt Dependencies

### Backend

Di chuyển vào thư mục backend của dự án và cài đặt các dependencies bằng npm:

```bash
cd WebBlog/server
npm install
```

### Frontend

Di chuyển vào thư mục frontend của dự án và cài đặt các dependencies bằng npm:

```bash
cd WebBlog/client
npm install
```

## Bước 3: Thiết lập Environment Variables

Tạo một file `.env` trong thư mục gốc của dự án và cung cấp các biến môi trường sau cho cả backend và frontend:

```
# Backend
PORT=8000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret

```

## Bước 4: Khởi động Backend

Trong thư mục `backend`, khởi động server Node.js bằng lệnh sau:

```bash
npm start
```

## Bước 5: Khởi động Frontend

Trong thư mục `frontend`, khởi động ứng dụng React bằng lệnh sau:

```bash
npm run dev
```

## Bước 6: Truy cập Ứng dụng

Mở trình duyệt web và truy cập vào địa chỉ sau:

```
http://localhost:5173
```

Mở trình duyệt web và truy cập vào địa chỉ sau:

```
http://localhost:8000
```
