import {call, put, takeLatest} from "redux-saga/effects";
import supplierApi from "./supplierApi";
import {
    getSupplierFailed,
    getSupplierRequest,
    getSupplierSuccess,
    addSupplierFailed,
    addSupplierRequest,
    addSupplierSuccess,
    deleteSupplierRequest, updateSupplierRequest
} from "./supplierSlice";

function* addSupplier(action) {
    try {
        const response = yield call(supplierApi.addSupplier, action.payload);
        yield put(addSupplierSuccess(response));
        const data = yield call(supplierApi.getSupplier, action.payload);
        yield put(getSupplierSuccess(data));
    } catch (err) {
        yield put(addSupplierFailed(err.response?.data?.message || err.message));
    }
}

function* updateSupplier(action) {
    try {
        const response = yield call(supplierApi.updateSupplier, action.payload);
        yield put(addSupplierSuccess(response));
        const data = yield call(supplierApi.getSupplier, action.payload);
        yield put(getSupplierSuccess(data));
    } catch (err) {
        yield put(addSupplierFailed(err.response?.data?.message || err.message));
    }
}

function* getSupplier(action) {
    try {
        const response = yield call(supplierApi.getSupplier, action.payload);
        yield put(getSupplierSuccess(response));
    } catch (err) {
        yield put(getSupplierFailed(err.response?.data?.message || err.message));
    }
}

function* deleteSupplierById(action) {
    try {
        const id = action.payload;
        const response = yield call(supplierApi.deleteSupplier, id);
        yield put(addSupplierSuccess(response));
        const data = yield call(supplierApi.getSupplier, action.payload);
        yield put(getSupplierSuccess(data));
    } catch (err) {
        yield put(addSupplierFailed(err.response?.data?.message || err.message));
    }
}

export default function* supplierSaga() {
    yield takeLatest(addSupplierRequest.type, addSupplier);
    yield takeLatest(updateSupplierRequest.type, updateSupplier);
    yield takeLatest(getSupplierRequest.type, getSupplier);
    yield takeLatest(deleteSupplierRequest.type, deleteSupplierById);
}