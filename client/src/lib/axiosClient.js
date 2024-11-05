import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
})

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data
  }

  throw new Error("Có lỗi xảy ra khi tạo sản phẩm")
}, (error) => {
  throw error
})

export default axiosClient