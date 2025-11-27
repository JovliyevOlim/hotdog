import api from "../api";

export default {
    addModify: (data) => api.post("/modifiers", data).then(res => res.data),
    addModifyOptions: (data) => api.post(`/modifiers/${data.id}/options`, data).then(res => res.data),
    updateModify: (data) => api.put("/modifiers/" + data?.id, data).then(res => res.data),
    deleteModify: (data) => api.delete("/modifiers/"+data).then(res => res.data),
    getModifyById: (data) => api.get("/modifiers/" + data).then(res => res.data),
    getModify: (data) => api.get("/modifiers").then(res => res.data),
};