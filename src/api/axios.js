import axios from 'axios';

const api = axios.create({
    baseURL: String(import.meta.env.VITE_BACKEND_URL),
    withCredentials: true,
});

export default api;