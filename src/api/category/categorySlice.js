import {createSlice} from "@reduxjs/toolkit";

const slice = createSlice({
    name: "Category",
    initialState: {
        category: null,
        categoryOne: null,
        token: null,
        isLoading: false,
        isSuccess: false,
        error: null,
    },
    reducers: {
        addCategoryRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        addCategorySuccess: (state, action) => {
            state.isLoading = false
            state.isSuccess = true;
        },
        addCategoryFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },

        updateCategoryRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        deleteCategoryRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        getCategoryRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        getCategorySuccess: (state, action) => {
            state.category = action.payload;
            state.isLoading = false
        },
        getCategoryFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },

        getCategoryByIdRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },
        getCategoryByIdSuccess: (state, action) => {
            state.categoryOne = action.payload;
            state.isLoading = false
        },
        getCategoryByIdFailed: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },

        resetSuccess: (state) => {
            state.isSuccess = false
        }
    },
});

export const {
    addCategoryRequest,
    updateCategoryRequest,
    addCategorySuccess,
    addCategoryFailed,
    getCategoryRequest,
    getCategorySuccess,
    getCategoryFailed,
    getCategoryByIdRequest,
    getCategoryByIdFailed,
    getCategoryByIdSuccess,
    deleteCategoryRequest,
    resetSuccess,
} = slice.actions;
export default slice.reducer;