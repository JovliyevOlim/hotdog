import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "Product",
    initialState: {
        products: null,
        productsSearch: null,
        token: null,
        isLoading: false,
        isSuccess: false,
        isImageSuccess: false,
        error: null,
        productId: null,
    },
    reducers: {
        addProductRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        addProductSuccess: (state, action) => {
            state.productId = action.payload.id
            state.isLoading = false
            state.isSuccess = true;
        },
        addProductFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },

        deleteProductRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },

        addProductImageRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        addProductImageSuccess: (state, action) => {
            state.isLoading = false
            state.isImageSuccess = true;
        },
        addProductImageFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },


        getProductRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        getProductSuccess: (state, action) => {
            state.products = action.payload;
            state.isLoading = false
        },
        getProductFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },

        getProductSearchRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        getProductSearchSuccess: (state, action) => {
            state.productsSearch = action.payload;
            state.isLoading = false
        },
        getProductSearchFailed: (state, action) => {
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
    addProductRequest,
    addProductSuccess,
    addProductFailed,
    getProductRequest,
    getProductSuccess,
    getProductFailed,
    addProductImageRequest,
    addProductImageSuccess,
    addProductImageFailed,
    deleteProductRequest,
    getProductSearchFailed,
    getProductSearchRequest,
    getProductSearchSuccess,
    resetSuccess,
} = slice.actions;
export default slice.reducer;