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
    reportSoldProducts: (data) => api.get("/analytics/sold-products", {
        params: data,
    }).then(res => res.data),
    reportPurchasedProducts: (data) => api.get("/analytics/purchased-products", {
        params: data,
    }).then(res => res.data),
    reportProfitExpense: (data) => api.get("/analytics/profit-expense", {
        params: data,
    }).then(res => res.data),
};