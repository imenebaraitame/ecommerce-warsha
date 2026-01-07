const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Products
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCT_BY_ID: (id) => `${API_BASE_URL}/products/${id}`,
  PRODUCTS_SEARCH: `${API_BASE_URL}/products/search`,
  PRODUCTS_BY_CATEGORY: (category) => `${API_BASE_URL}/products/category/${category}`,
  
  // Categories
  CATEGORIES: `${API_BASE_URL}/categories`,
  CATEGORY_BY_ID: (id) => `${API_BASE_URL}/categories/${id}`,
  
  // Cart
  CART: `${API_BASE_URL}/carts`,
  CART_ITEMS: `${API_BASE_URL}/carts/items`,
  CART_ITEM_BY_ID: (productId) => `${API_BASE_URL}/carts/items/${productId}`,
  
  // Users
  SIGNUP: `${API_BASE_URL}/users/signup`,
  LOGIN: `${API_BASE_URL}/users/login`,
  USERS: `${API_BASE_URL}/users`,
};

export default API_BASE_URL;
