import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/tasks",
  withCredentials: true,
});

export const fetchTasks = () => API.get("/");
export const getTask = (id) => API.get(`/${id}`);
export const createTask = (data) => API.post("/", data);
export const updateTask = (id, data) => API.put(`/${id}`, data);
export const deleteTask = (id) => API.delete(`/${id}`);
