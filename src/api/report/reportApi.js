import api from "../api";

export default {
    reportProfit: (data) => api.get("/reports/profit", {
        params: data,
    }).then(res => res.data),
    reportDailyProfit: (data) => api.get("/reports/daily-profit",{
        params: data,
    }).then(res => res.data),
};