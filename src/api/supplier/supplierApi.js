import api from "../api";

export default {
    addSupplier: (data) => api.post("/supplierss", data).then(res => res.data),
    updateSupplier: (data) => api.put("/supplierss/"+data.id, data).then(res => res.data),
    deleteSupplier: (data) => api.delete("/supplierss/"+data).then(res => res.data),
    getSupplierById: (data) => api.get("/supplierss").then(res => res.data),
    getSupplier: (data) => api.get("/supplierss").then(res => res.data),
};