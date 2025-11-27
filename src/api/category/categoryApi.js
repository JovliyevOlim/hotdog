import api from "../api";

export default {
    addCategory: (data) => api.post("/categories", data).then(res => res.data),
    updateCategory: (data) => api.put("/categories/" + data?.id, data).then(res => res.data),
    deleteCategory: (data) => api.delete("/categories/"+data).then(res => res.data),
    getCategoryById: (data) => api.get("/categories/" + data).then(res => res.data),
    getCategory: (data) => api.get("/categories").then(res => res.data),
};