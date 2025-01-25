import axios from "axios";

const BASE_URL = "http://localhost:5008"; // Replace with your backend URL

// Café API calls
export const getCafes = (locationFilter) => locationFilter =='' || locationFilter == null ?axios.get(`${BASE_URL}/api/cafes`) :
axios.get(`${BASE_URL}/api/cafes?location=${locationFilter}`);
export const addCafe = (cafe) => axios.post(`${BASE_URL}/api/cafes`,cafe);
export const updateCafe = (id, updatedData) => axios.put(`${BASE_URL}/api/cafes`, updatedData);
export const deleteCafe = (id) => axios.delete(`${BASE_URL}/api/cafes?id=${id}`);

// Employee API calls
export const getEmployees = (id) => axios.get(`${BASE_URL}/api/employees?cafeId=${id}`);
export const addEmployee = (employee) => axios.post(`${BASE_URL}/api//employees`, employee);
export const updateEmployee = (id, updatedData) => axios.put(`${BASE_URL}/api//employees/${id}`, updatedData);
export const deleteEmployee = (id) => axios.delete(`${BASE_URL}/api//employees?id=${id}`);
