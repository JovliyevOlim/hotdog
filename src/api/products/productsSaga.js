import {all, call, put, takeLatest,debounce} from "redux-saga/effects";
import ProductApi from "./productsApi";
import {
    getProductFailed,
    getProductRequest,
    getProductSuccess,
    addProductFailed,
    addProductRequest,
    addProductSuccess,
    addProductImageSuccess,
    addProductImageFailed,
    addProductImageRequest,
    deleteProductRequest,
    getProductSearchRequest,
    getProductSearchSuccess,
    getProductSearchFailed,
} from "./productsSlice";

function* addProduct(action) {
    try {
        const response = yield call(ProductApi.addProduct, action.payload);
        yield put(addProductSuccess(response));
        const data = yield call(ProductApi.getProduct, action.payload);
        yield put(getProductSuccess(data));
    } catch (err) {
        yield put(addProductFailed(err.response?.data?.message || err.message));
    }
}

function* addProductImage(action) {
    try {
        const response = yield call(ProductApi.addProductImage, action.payload);
        yield put(addProductImageSuccess(response));
        const data = yield call(ProductApi.getProduct, action.payload);
        yield put(getProductSuccess(data));
    } catch (err) {
        yield put(addProductImageFailed(err.response?.data?.message || err.message));
    }
}

function* getProduct(action) {
    try {
        const response = yield call(ProductApi.getProduct, action.payload);
        const productsWithImages = yield all(
            response.map(function* (p) {
                const imageUrl = yield call(getProductImage, p.id);
                return {
                    ...p,
                    imageUrl,
                };
            })
        );
        console.log(productsWithImages);
        yield put(getProductSuccess(productsWithImages));
    } catch (err) {
        yield put(getProductFailed(err.response?.data?.message || err.message));
    }
}

function* getProductImage(action) {
    try {
        const response = yield call(ProductApi.getProductImageById, action);
        if (!response) {
            return "https://motobros.com/wp-content/uploads/2024/09/no-image.jpeg";
        }
        const blob = new Blob([response], {type: response.type || "image/svg+xml"});
        return URL.createObjectURL(blob);
    } catch (err) {
        return "https://motobros.com/wp-content/uploads/2024/09/no-image.jpeg";
    }
}


function* getProductSearch(action) {
    try {
        const response = yield call(ProductApi.getProductSearch, action.payload);

        yield put(getProductSearchSuccess(response));
    } catch (err) {
        yield put(getProductSearchFailed(err.response?.data?.message || err.message));
    }
}

function* deleteProduct(action) {
    try {
        const response = yield call(ProductApi.deleteProduct, action.payload);
        yield put(addProductSuccess(response));
        const data = yield call(ProductApi.getProduct, action.payload);
        yield put(getProductSuccess(data));
    } catch (err) {
        yield put(addProductFailed(err.response?.data?.message || err.message));
    }
}


export default function* productsSaga() {
    yield takeLatest(addProductRequest.type, addProduct);
    yield takeLatest(deleteProductRequest.type, deleteProduct);
    yield takeLatest(getProductRequest.type, getProduct);
    yield takeLatest(addProductImageRequest.type, addProductImage);
    yield debounce(300,getProductSearchRequest.type, getProductSearch);
}