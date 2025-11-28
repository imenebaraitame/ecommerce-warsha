// applicatin url : http://localhost:5000/api/products

import express from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";

const router = express.Router();

router.get("/", getProducts); // localhost:5000/api/products

//re.params.id
router.get("/:id", getProductById); // localhost:5000/api/products/:id

router.post("/", addProduct); // localhost:5000/api/products

router.put("/:id", updateProduct); // localhost:5000/api/products/:id

router.delete("/:id", deleteProduct); // localhost:5000/api/products/:id

export default router;