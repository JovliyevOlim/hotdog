import api from "../api";

export default {
    addPurchase: (data) => api.post("/purchase", data).then(res => res.data),
    addSales: (data) => api.post("/sale", data).then(res => res.data),
};