import express from "express";
import {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryControllers.js";

const router = express.Router();

// Define the route to get all categories
router.get("/", getCategories); // localhost:3000/api/categories/
router.post("/", addCategory); // localhost:3000/api/categories/
router.get("/:id", getCategoryById); // localhost:3000/api/categories/:id
router.put("/:id", updateCategory); // localhost:3000/api/categories/:id
router.delete("/:id", deleteCategory); // localhost:3000/api/categories/:id

// Export the router
export default router;