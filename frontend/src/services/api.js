import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

export const getEmployees = () => API.get("/employees");
export const addEmployee = (data) => API.post("/employees", data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

export const markAttendance = (data) => API.post("/attendance", data);
export const getAttendance = (params) =>
  API.get("/attendance", { params });

export default API;
