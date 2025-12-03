import {all, call, put, takeLatest,debounce} from "redux-saga/effects";
import purchaseApi from "./purchaseApi";
import {
    addPurchaseFailed,
    addPurchaseRequest, addPurchaseSuccess, addSalesFailed, addSalesRequest, addSalesSuccess
} from "./purchaseSlice";

function* addPurchase(action) {
    console.log(action);
    try {
        const response = yield call(purchaseApi.addPurchase, action.payload);
        yield put(addPurchaseSuccess(response));
    } catch (err) {
        yield put(addPurchaseFailed(err.response?.data?.message || err.message));
    }
}

function* addSales(action) {
    console.log(action);
    try {
        const response = yield call(purchaseApi.addSales, action.payload);
        yield put(addSalesSuccess(response));
    } catch (err) {
        yield put(addSalesFailed(err.response?.data?.message || err.message));
    }
}


export default function* purchaseSaga() {
    yield takeLatest(addPurchaseRequest.type, addPurchase);
    yield takeLatest(addSalesRequest.type, addSales);
}