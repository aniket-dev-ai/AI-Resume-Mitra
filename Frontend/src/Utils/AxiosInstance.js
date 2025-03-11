import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Apne backend ka base URL daalo
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
