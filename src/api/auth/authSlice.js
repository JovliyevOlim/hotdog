import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        loginRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoading = false
        },
        loginFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },

        registerRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        registerSuccess: (state,action) => {
            state.user = action.payload;
            state.isLoading = false
        },
        registerFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },

        logout: (state) => {
            state.user = null;
            state.token = null
        },
    },
});

export const {
    loginRequest,
    loginSuccess,
    loginFailed,
    registerRequest,
    registerSuccess,
    registerFailed,
    logout
} = authSlice.actions;
export default authSlice.reducer;