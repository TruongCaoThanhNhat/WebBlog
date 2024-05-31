import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // Đặt timeout cho request (ms)
  headers: {
    "Content-Type": "application/json",
  },
});

// Bạn có thể cấu hình interceptor để xử lý token hoặc lỗi toàn cục
axiosInstance.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu cần thiết
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xử lý lỗi toàn cục ở đây
    if (error.response.status === 401) {
      // Ví dụ: Chuyển hướng đến trang đăng nhập nếu lỗi 401
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
