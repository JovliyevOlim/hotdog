import {all, call, put, takeLatest, debounce} from "redux-saga/effects";
import reportApi from "./reportApi";
import {
    getReportProfitRequest,
    getReportProfitFailed,
    getReportProfitSuccess,
    getReportDailyProfitRequest,
    getReportDailyProfitSuccess,
    getReportDailyProfitFailed,
    getReportSaleRequest,
    getReportPurchaseRequest,
    getReportSaleSuccess,
    getReportSaleFailed, getReportPurchaseSuccess, getReportPurchaseFailed
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


export default function* reportSaga() {
    yield takeLatest(getReportProfitRequest.type, getReportProfit);
    yield takeLatest(getReportDailyProfitRequest.type, getReportProfitDaily);
    yield takeLatest(getReportSaleRequest.type, getReportSale);
    yield takeLatest(getReportPurchaseRequest.type, getReportPurchase);
}