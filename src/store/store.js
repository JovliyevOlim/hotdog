import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "../api/auth/authSlice";
import supplierReducer from "../api/supplier/supplierSlice";
import categoryReducer from "../api/category/categorySlice";
import productsReducer from "../api/products/productsSlice";
import modifyReducer from "../api/modify/modifySlice";
import purchaseReducer from "../api/purchase/PurchaseSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        supplier: supplierReducer,
        category: categoryReducer,
        products: productsReducer,
        modify: modifyReducer,
        purchase: purchaseReducer
    },
    middleware: (getDefault) => getDefault({thunk: false}).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);