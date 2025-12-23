import {call, put, takeLatest} from "redux-saga/effects";
import reportApi from "./reportApi";
import {
    getReportProfitRequest,
    getReportProfitFailed,
    getReportProfitSuccess,
    getReportDailyProfitRequest,
    getReportDailyProfitSuccess,
    getReportDailyProfitFailed,
    getReportSaleSuccess,
    getReportSaleFailed,
    getReportPurchaseSuccess,
    getReportPurchaseFailed,
    getReportSoldProductsRequest,
    getReportSoldProductsSuccess,
    getReportSoldProductsFailed,
    getReportPurchaseProductsSuccess,
    getReportPurchaseProductsFailed,
    getReportPurchaseProductsRequest,
    getReportProfitExpenseSuccess,
    getReportProfitExpenseRequest,
} from "./reportSlice";

function* getReportProfit(action) {
    try {
        const response = yield call(reportApi.reportProfit, action.payload);
        yield put(getReportProfitSuccess(response));
    } catch (err) {
        yield put(getReportProfitFailed(err.response?.data?.message || err.message));
    }
}

function* getReportProfitDaily(action) {
    try {
        const response = yield call(reportApi.reportDailyProfit, action.payload);
        yield put(getReportDailyProfitSuccess(response));
    } catch (err) {
        yield put(getReportDailyProfitFailed(err.response?.data?.message || err.message));
    }
}

function* getReportSale(action) {
    try {
        const response = yield call(reportApi.reportSale, action.payload);
        yield put(getReportSaleSuccess(response));
    } catch (err) {
        yield put(getReportSaleFailed(err.response?.data?.message || err.message));
    }
}

function* getReportPurchase(action) {
    try {
        const response = yield call(reportApi.reportPurchase, action.payload);
        yield put(getReportPurchaseSuccess(response));
    } catch (err) {
        yield put(getReportPurchaseFailed(err.response?.data?.message || err.message));
    }
}

function* getReportSoldProductsRequestAll(action) {
    try {
        const response = yield call(reportApi.reportSoldProducts, action.payload);
        yield put(getReportSoldProductsSuccess(response));
    } catch (err) {
        yield put(getReportSoldProductsFailed(err.response?.data?.message || err.message));
    }
}

function* getReportPurchaseProductsRequestAll(action) {
    try {
        const response = yield call(reportApi.reportPurchasedProducts, action.payload);
        yield put(getReportPurchaseProductsSuccess(response));
    } catch (err) {
        yield put(getReportPurchaseProductsFailed(err.response?.data?.message || err.message));
    }
}
function* getProfitExpenseAll(action) {
    try {
        const response = yield call(reportApi.reportProfitExpense, action.payload);
        yield put(getReportProfitExpenseSuccess(response));
    } catch (err) {
        yield put(getReportProfitFailed(err.response?.data?.message || err.message));
    }
}


export default function* reportSaga() {
    yield takeLatest(getReportProfitRequest.type, getReportProfit);
    yield takeLatest(getReportDailyProfitRequest.type, getReportProfitDaily);
    yield takeLatest(getReportSoldProductsRequest.type, getReportSoldProductsRequestAll);
    yield takeLatest(getReportPurchaseProductsRequest.type, getReportPurchaseProductsRequestAll);
    yield takeLatest(getReportPurchaseProductsRequest.type, getReportPurchaseProductsRequestAll);
    yield takeLatest(getReportProfitExpenseRequest.type, getProfitExpenseAll);
}