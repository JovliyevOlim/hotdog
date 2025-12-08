import {all, call, put, takeLatest, debounce} from "redux-saga/effects";
import reportApi from "./reportApi";
import {
    getReportProfitRequest,
    getReportProfitFailed,
    getReportProfitSuccess,
    getReportDailyProfitRequest,
    getReportDailyProfitSuccess,
    getReportDailyProfitFailed
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


export default function* reportSaga() {
    yield takeLatest(getReportProfitRequest.type, getReportProfit);
    yield takeLatest(getReportDailyProfitRequest.type, getReportProfitDaily);
}