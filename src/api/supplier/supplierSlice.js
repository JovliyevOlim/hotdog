import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "supplier",
    initialState: {
        supplier: null,
        token: null,
        isLoading: false,
        error: null,
        isSuccess: false,
    },
    reducers: {
        addSupplierRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        addSupplierSuccess: (state, action) => {
            state.isLoading = false
            state.isSuccess = true;
        },
        addSupplierFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },

        updateSupplierRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        deleteSupplierRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },


        getSupplierRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        getSupplierSuccess: (state, action) => {
            state.supplier = action.payload;
            state.isLoading = false
        },
        getSupplierFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },


        resetSuccess: (state) => {
            state.isSuccess = false
        }
    },
});

export const {
    addSupplierRequest,
    addSupplierSuccess,
    addSupplierFailed,
    getSupplierRequest,
    getSupplierSuccess,
    getSupplierFailed,
    updateSupplierRequest,
    deleteSupplierRequest,
    resetSuccess,
} = slice.actions;
export default slice.reducer;