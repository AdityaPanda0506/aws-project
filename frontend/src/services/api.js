import axios from "axios";

const api = axios.create({

    baseURL: import.meta.env.VITE_API_URL

});

export const uploadCSV = (formData) =>
    api.post("/upload/", formData);

export const getHistory = () =>
    api.get("/history");

export const getDashboard = () =>
    api.get("/dashboard");

export const getReport = (id) =>
    api.get(`/report/${id}`);

export default api;