// applicatin url : http://localhost:5000/api/products

import express from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  searchProductByFilters
} from "../controllers/productControllers.js";

const router = express.Router();

router.get("/", getProducts); // localhost:5000/api/products

router.get("/search", searchProductByFilters);// localhost:5000/api/products/search?name=...&category=...&minPrice=...

router.get("/:id", getProductById); // localhost:5000/api/products/:id

router.post("/", addProduct); // localhost:5000/api/products

router.put("/:id", updateProduct); // localhost:5000/api/products/:id

router.delete("/:id", deleteProduct); // localhost:5000/api/products/:id


router.get("/category/:category", getProductsByCategory); // localhost:5000/api/products/category/:category


export default router;