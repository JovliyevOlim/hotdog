import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "report",
    initialState: {
        reportProfit:[],
        reportDailyProfit:[],
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
    resetSuccess,
} = slice.actions;
export default slice.reducer;