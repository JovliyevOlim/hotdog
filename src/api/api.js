import axios from "axios";
import {getItems} from "../utils/utils";

export const baseUrl = "http://75.119.159.238:8080/api"
// Base axios instance
const api = axios.create({
    baseURL:baseUrl, // backend URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor (token qo‘shish)
api.interceptors.request.use(
    (config) => {
        const token = getItems("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor (global error handling)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // optional: auto logout
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;