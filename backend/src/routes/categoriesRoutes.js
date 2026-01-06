import express from "express";
import {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryControllers.js";

import authenticationToken from '../middlewares/auth.js';
import isAdmin from '../middlewares/isAdmin.js';


const router = express.Router();

// Define the route to get all categories
router.get("/", getCategories); // localhost:3000/api/categories/
router.get("/:id", getCategoryById); // localhost:3000/api/categories/:id
router.post("/", authenticationToken,isAdmin, addCategory); // localhost:3000/api/categories/
router.put("/:id", authenticationToken, isAdmin, updateCategory); // localhost:3000/api/categories/:id
router.delete("/:id", authenticationToken, isAdmin, deleteCategory); // localhost:3000/api/categories/:id

// Export the router
export default router;