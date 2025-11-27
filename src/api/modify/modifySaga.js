import {call, put, takeLatest} from "redux-saga/effects";
import ModifyApi from "./modifyApi";
import {
    getModifyFailed,
    getModifyRequest,
    getModifySuccess,
    addModifyFailed,
    addModifyRequest,
    addModifySuccess,
    getModifyByIdRequest,
    getModifyByIdSuccess,
    getModifyByIdFailed,
    updateModifyRequest,
    deleteModifyRequest,
    addModifyOptionsRequest
} from "./modifySlice";

function* addModify(action) {
    try {
        const response = yield call(ModifyApi.addModify, action.payload);
        yield put(addModifySuccess(response));
        const data = yield call(ModifyApi.getModify, action.payload);
        yield put(getModifySuccess(data));
    } catch (err) {
        yield put(addModifyFailed(err.response?.data?.message || err.message));
    }
}

function* addModifyOptions(action) {
    try {
        const response = yield call(ModifyApi.addModifyOptions, action.payload);
        yield put(addModifySuccess(response));
        const data = yield call(ModifyApi.getModify, action.payload);
        yield put(getModifySuccess(data));
    } catch (err) {
        yield put(addModifyFailed(err.response?.data?.message || err.message));
    }
}

function* updateModify(action) {
    try {
        const response = yield call(ModifyApi.updateModify, action.payload);
        yield put(addModifySuccess(response));
        const data = yield call(ModifyApi.getModify, action.payload);
        yield put(getModifySuccess(data));
    } catch (err) {
        yield put(addModifyFailed(err.response?.data?.message || err.message));
    }
}

function* getModify(action) {
    try {
        const response = yield call(ModifyApi.getModify, action.payload);
        yield put(getModifySuccess(response));
    } catch (err) {
        yield put(getModifyFailed(err.response?.data?.message || err.message));
    }
}

function* getModifyById(action) {
    try {
        const id = action.payload;
        const response = yield call(ModifyApi.getModifyById, id);
        yield put(getModifyByIdSuccess(response));
    } catch (err) {
        yield put(getModifyByIdFailed(err.response?.data?.message || err.message));
    }
}

function* deleteModifyById(action) {
    try {
        const id = action.payload;
        const response = yield call(ModifyApi.deleteModify, id);
        yield put(addModifySuccess(response));
        const data = yield call(ModifyApi.getModify, action.payload);
        yield put(getModifySuccess(data));
    } catch (err) {
        yield put(addModifyFailed(err.response?.data?.message || err.message));
    }
}

export default function* modifySaga() {
    yield takeLatest(addModifyRequest.type, addModify);
    yield takeLatest(addModifyOptionsRequest.type, addModifyOptions);
    yield takeLatest(updateModifyRequest.type, updateModify);
    yield takeLatest(getModifyRequest.type, getModify);
    yield takeLatest(getModifyByIdRequest.type, getModifyById);
    yield takeLatest(deleteModifyRequest.type, deleteModifyById);
}