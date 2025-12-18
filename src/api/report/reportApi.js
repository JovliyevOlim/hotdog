import api from "../api";

export default {
    reportProfit: (data) => api.get("/reports/profit", {
        params: data,
    }).then(res => res.data),
    reportDailyProfit: (data) => api.get("/reports/daily-profit", {
        params: data,
    }).then(res => res.data),
    reportSale: (data) => api.get("/sale", {
        params: data,
    }).then(res => res.data),
    reportPurchase: (data) => api.get("/purchase", {
        params: data,
    }).then(res => res.data),
};