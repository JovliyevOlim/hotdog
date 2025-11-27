import {call, put, takeLatest} from "redux-saga/effects";
import categoryApi from "./categoryApi";
import {
    getCategoryFailed,
    getCategoryRequest,
    getCategorySuccess,
    addCategoryFailed,
    addCategoryRequest,
    addCategorySuccess,
    getCategoryByIdRequest, getCategoryByIdSuccess, getCategoryByIdFailed, updateCategoryRequest, deleteCategoryRequest
} from "./categorySlice";

function* addCategory(action) {
    try {
        const response = yield call(categoryApi.addCategory, action.payload);
        yield put(addCategorySuccess(response));
        const data = yield call(categoryApi.getCategory, action.payload);
        yield put(getCategorySuccess(data));
    } catch (err) {
        yield put(addCategoryFailed(err.response?.data?.message || err.message));
    }
}

function* updateCategory(action) {
    try {
        const response = yield call(categoryApi.updateCategory, action.payload);
        yield put(addCategorySuccess(response));
        const data = yield call(categoryApi.getCategory, action.payload);
        yield put(getCategorySuccess(data));
    } catch (err) {
        yield put(addCategoryFailed(err.response?.data?.message || err.message));
    }
}

function* getCategory(action) {
    try {
        const response = yield call(categoryApi.getCategory, action.payload);
        yield put(getCategorySuccess(response));
    } catch (err) {
        yield put(getCategoryFailed(err.response?.data?.message || err.message));
    }
}

function* getCategoryById(action) {
    try {
        const id = action.payload;
        const response = yield call(categoryApi.getCategoryById, id);
        yield put(getCategoryByIdSuccess(response));
    } catch (err) {
        yield put(getCategoryByIdFailed(err.response?.data?.message || err.message));
    }
}

function* deleteCategoryById(action) {
    try {
        const id = action.payload;
        const response = yield call(categoryApi.deleteCategory, id);
        yield put(addCategorySuccess(response));
        const data = yield call(categoryApi.getCategory, action.payload);
        yield put(getCategorySuccess(data));
    } catch (err) {
        yield put(addCategoryFailed(err.response?.data?.message || err.message));
    }
}

export default function* categorySaga() {
    yield takeLatest(addCategoryRequest.type, addCategory);
    yield takeLatest(updateCategoryRequest.type, updateCategory);
    yield takeLatest(getCategoryRequest.type, getCategory);
    yield takeLatest(getCategoryByIdRequest.type, getCategoryById);
    yield takeLatest(deleteCategoryRequest.type, deleteCategoryById);
}