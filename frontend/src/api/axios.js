import axios from "axios";

const api = axios.create({
  baseURL: "https://hrms-lite-yyll.onrender.com/api"
});

export default api;

