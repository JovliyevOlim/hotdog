import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "purchase",
    initialState: {
        isLoading: false,
        isSuccess: false,
        error: null,
    },
    reducers: {
        addPurchaseRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        addPurchaseSuccess: (state, action) => {
            state.productId = action.payload.id
            state.isLoading = false
            state.isSuccess = true;
        },
        addPurchaseFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },


        addSalesRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        addSalesSuccess: (state, action) => {
            state.productId = action.payload.id
            state.isLoading = false
            state.isSuccess = true;
        },
        addSalesFailed: (state, action) => {
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
    addPurchaseSuccess,
    addPurchaseFailed,
    addPurchaseRequest,
    addSalesSuccess,
    addSalesFailed,
    addSalesRequest,
    resetSuccess,
} = slice.actions;
export default slice.reducer;