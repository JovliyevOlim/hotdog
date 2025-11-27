import { all } from "redux-saga/effects";
import authSaga from "../api/auth/authSaga";
import supplierSaga from "../api/supplier/supplierSaga";
import categorySaga from "../api/category/categorySaga";
import productsSaga from "../api/products/productsSaga";
import modifySaga from "../api/modify/modifySaga";
import purchaseSaga from "../api/purchase/purchaseSaga";
export default function* rootSaga() {
    yield all([authSaga(),supplierSaga(),categorySaga(),productsSaga(),modifySaga(),purchaseSaga()]);
}