import axios from "axios";

// ─── Base API URL ─────────────────────────────────────────────
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

// ─── Products API Calls ───────────────────────────────────────

// GET all products
export const getAllProducts = () => API.get("/products");

// GET single product by ID
export const getProductById = (id) => API.get(`/products/${id}`);

// POST create new product
export const createProduct = (data) => API.post("/products", data);

// PUT update product
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);

// DELETE product
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export default API;
