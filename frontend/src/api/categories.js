import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

export const getCategories = async () => {
  const response = await axios.get(API_ENDPOINTS.CATEGORIES);
  return response.data;
};