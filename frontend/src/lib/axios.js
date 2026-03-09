import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/attendance'
});

export default api;