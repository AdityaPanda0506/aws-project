import axios from "axios";

const api = axios.create({

    baseURL: "http://127.0.0.1:8000"

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