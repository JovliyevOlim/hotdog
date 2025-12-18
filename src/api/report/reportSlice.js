import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "report",
    initialState: {
        reportProfit: [],
        reportDailyProfit: [],
        reportSale: [],
        reportPurchase: [],
        isLoading: false,
        isSuccess: false,
        error: null,
    },
    reducers: {
        getReportProfitRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        getReportProfitSuccess: (state, action) => {
            state.reportProfit = action.payload;
            state.isLoading = false
        },
        getReportProfitFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },

        getReportDailyProfitRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        getReportDailyProfitSuccess: (state, action) => {
            state.reportDailyProfit = action.payload[0];
            state.isLoading = false
        },
        getReportDailyProfitFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },

        getReportSaleRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        getReportSaleSuccess: (state, action) => {
            state.reportSale = action.payload;
            state.isLoading = false
        },
        getReportSaleFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },

        getReportPurchaseRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        getReportPurchaseSuccess: (state, action) => {
            state.reportPurchase = action.payload;
            state.isLoading = false
        },
        getReportPurchaseFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },

        resetSuccess: (state) => {
            state.isSuccess = false
            state.isImageSuccess = false
            state.productId = null
        }
    },
});

export const {
    getReportProfitRequest,
    getReportProfitFailed,
    getReportProfitSuccess,
    getReportDailyProfitFailed,
    getReportDailyProfitSuccess,
    getReportDailyProfitRequest,
    getReportSaleRequest,
    getReportSaleSuccess,
    getReportSaleFailed,
    getReportPurchaseRequest,
    getReportPurchaseSuccess,
    getReportPurchaseFailed,
    resetSuccess,
} = slice.actions;
export default slice.reducer;