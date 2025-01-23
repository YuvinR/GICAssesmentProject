import axios from "axios";

const BASE_URL = "http://localhost:5000"; // Replace with your backend URL

// Café API calls
export const getCafes = () => axios.get(`${BASE_URL}/cafes`);
export const addCafe = (cafe) => axios.post(`${BASE_URL}/cafes`, cafe);
export const updateCafe = (id, updatedData) => axios.put(`${BASE_URL}/cafes/${id}`, updatedData);
export const deleteCafe = (id) => axios.delete(`${BASE_URL}/cafes/${id}`);

// Employee API calls
export const getEmployees = () => axios.get(`${BASE_URL}/employees`);
export const addEmployee = (employee) => axios.post(`${BASE_URL}/employees`, employee);
export const updateEmployee = (id, updatedData) => axios.put(`${BASE_URL}/employees/${id}`, updatedData);
export const deleteEmployee = (id) => axios.delete(`${BASE_URL}/employees/${id}`);
