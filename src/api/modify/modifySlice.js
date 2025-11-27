import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "Modify",
    initialState: {
        modify: null,
        modifyOne: null,
        token: null,
        isLoading: false,
        isSuccess: false,
        error: null,
    },
    reducers: {
        addModifyRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        addModifySuccess: (state, action) => {
            state.isLoading = false
            state.isSuccess = true;
        },
        addModifyFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },

        addModifyOptionsRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        updateModifyRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        deleteModifyRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        getModifyRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        getModifySuccess: (state, action) => {
            state.modify = action.payload;
            state.isLoading = false
        },
        getModifyFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },

        getModifyByIdRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        getModifyByIdSuccess: (state, action) => {
            state.modifyOne = action.payload;
            state.isLoading = false
        },
        getModifyByIdFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },

        resetSuccess: (state) => {
            state.isSuccess = false
        }
    },
});

export const {
    addModifyRequest,
    updateModifyRequest,
    addModifyOptionsRequest,
    addModifySuccess,
    addModifyFailed,
    getModifyRequest,
    getModifySuccess,
    getModifyFailed,
    getModifyByIdRequest,
    getModifyByIdFailed,
    getModifyByIdSuccess,
    deleteModifyRequest,
    resetSuccess,
} = slice.actions;
export default slice.reducer;