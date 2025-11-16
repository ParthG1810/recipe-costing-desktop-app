import axios from 'axios';
import { config } from '../config';

// Create axios instance with default config
const api = axios.create({
  baseURL: config.api.baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorMessage = error.response?.data?.error || error.message || 'An error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

// ============================================
// PRODUCTS API
// ============================================

export const productsAPI = {
  // Get all products
  getAll: () => api.get('/api/products'),
  
  // Get single product
  getById: (id) => api.get(`/api/products/${id}`),
  
  // Create product
  create: (productData) => api.post('/api/products', productData),
  
  // Update product
  update: (id, productData) => api.put(`/api/products/${id}`, productData),
  
  // Delete product
  delete: (id) => api.delete(`/api/products/${id}`),
};

// ============================================
// RECIPES API
// ============================================

export const recipesAPI = {
  // Get all recipes
  getAll: () => api.get('/api/recipes'),
  
  // Get single recipe
  getById: (id) => api.get(`/api/recipes/${id}`),
  
  // Create recipe
  create: (recipeData) => api.post('/api/recipes', recipeData),
  
  // Update recipe
  update: (id, recipeData) => api.put(`/api/recipes/${id}`, recipeData),
  
  // Delete recipe
  delete: (id) => api.delete(`/api/recipes/${id}`),
};

// ============================================
// CONFIG API
// ============================================

export const configAPI = {
  // Get app configuration
  get: () => api.get('/api/config'),
};

export default api;
