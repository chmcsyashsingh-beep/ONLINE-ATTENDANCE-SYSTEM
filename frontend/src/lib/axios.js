import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:3000/attendance"
      : "https://online-attendance-system-tf94.onrender.com/attendance",
});

export default api;
