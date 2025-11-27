import {call, put, takeLatest} from "redux-saga/effects";
import authApi from "./authApi";
import {loginRequest, loginSuccess, loginFailed, registerRequest, registerSuccess, registerFailed} from "./authSlice";
import {setItems} from "../../utils/utils";

// login worker
function* loginWorker(action) {
    console.log(action);
    try {
        const response = yield call(authApi.login, action.payload);
        setItems('token', response.token);
        yield put(loginSuccess(response));
    } catch (err) {
        yield put(loginFailed(err.response?.data?.message || err.message));
    }
}

// register worker
function* registerWorker(action) {
    try {
        const response = yield call(authApi.register, action.payload);
        setItems('token',response.token);
        yield put(registerSuccess(response));
    } catch (err) {
        yield put(registerFailed(err.response?.data?.message || err.message));
    }
}

export default function* authSaga() {
    yield takeLatest(loginRequest.type, loginWorker);
    yield takeLatest(registerRequest.type, registerWorker);
}