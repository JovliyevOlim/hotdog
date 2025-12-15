import api from "../api";

export default {
    addProduct: (data) => api.post("/products", data).then(res => res.data),
    updateProduct: (data) => api.put("/products/" + data.id, data).then(res => res.data),
    deleteProduct: (data) => api.delete("/products/" + data).then(res => res.data),
    getProductById: (data) => api.get("/products/" + data).then(res => res.data),
    getProduct: (data) => api.get("/products").then(res => res.data),
    getProductSearch: (data) => api.get("/products/search", {
        params: {
            value: data
        }
    }).then(res => res.data),
    getProductImageById: (data) => api.get("/products/" + data + "/image", {
        responseType: "blob",
    }).then(res => res.data),
    deleteProductImage: (data) => api.get("/products").then(res => res.data),
    addProductImage: (data) => api.post("/products/" + data.id + "/upload-image", data.image, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then(res => res.data),
};