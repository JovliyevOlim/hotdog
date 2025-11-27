import api from "../api";

export default {
    register: (data) => api.post("/auth/register", data).then(res => res.data),
    login: (data) => api.post("/auth/authenticate", data).then(res => res.data),
    getMe: () => api.get("/auth/me").then(res => res.data),
};