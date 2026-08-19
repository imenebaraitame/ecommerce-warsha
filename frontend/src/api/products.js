import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export const getProducts = async () => {
  const response = await axios.get(API_ENDPOINTS.PRODUCTS);
  return response.data;
};

export const searchProducts = async (params) => {
  const response = await axios.get(API_ENDPOINTS.PRODUCTS_SEARCH, {
    params,
  });
  return response.data;
};