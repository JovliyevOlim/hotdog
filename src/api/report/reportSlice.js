import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "report",
    initialState: {
        reportProfit: [],
        reportDailyProfit: [],
        reportSoldProducts: null,
        reportPurchaseProducts: null,
        reportProfitExpense: null,
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


        getReportSoldProductsRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        getReportSoldProductsSuccess: (state, action) => {
            state.reportSoldProducts = action.payload;
            state.isLoading = false
        },
        getReportSoldProductsFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },

        getReportPurchaseProductsRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        getReportPurchaseProductsSuccess: (state, action) => {
            state.reportPurchaseProducts = action.payload;
            state.isLoading = false
        },
        getReportPurchaseProductsFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },

        getReportProfitExpenseRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        getReportProfitExpenseSuccess: (state, action) => {
            state.reportProfitExpense = action.payload;
            state.isLoading = false
        },
        getReportProfitExpenseFailed: (state, action) => {
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
    getReportSaleSuccess,
    getReportSaleFailed,
    getReportPurchaseSuccess,
    getReportPurchaseFailed,
    getReportSoldProductsRequest,
    getReportSoldProductsSuccess,
    getReportSoldProductsFailed,
    getReportPurchaseProductsRequest,
    getReportPurchaseProductsSuccess,
    getReportPurchaseProductsFailed,
    getReportProfitExpenseSuccess,
    getReportProfitExpenseRequest,
    getReportProfitExpenseFailed,
    resetSuccess,
} = slice.actions;
export default slice.reducer;