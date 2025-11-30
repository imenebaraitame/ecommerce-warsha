import Product from "../models/product.js";

import express from "express";
import errorMiddleware from "../middlewares/errorMiddleware.js";
const app = express();

// use error middleware
app.use(errorMiddleware);

const getProducts = async(req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" , error: error.message} );
  }
};

// get product by id
const getProductById = async(req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// add a new product
const addProduct = async(req, res) => {
  try {
    const { name, price, description, category } = req.body;
    if (!name || !price || !description || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(price)) {
      return res.status(400).json({ message: "Product price must be a number" });
    }
    const newProduct = new Product({
      name,
      price,
      description,
      category,
    });
    // check for name uniqueness
    const existingProduct = await Product.findOne({ name: name });
    if (existingProduct) {
      return res.status(400).json({ message: "Product name must be unique" });
    }

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Validation Error", error: error.message });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }

};

// Put ,  update product
const updateProduct = async(req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, description, category } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, description, category },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Validation Error", error: error.message });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// delete product
const deleteProduct = async(req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// get products by category
const getProductsByCategory = async(req, res) => {
  try {
    const category = req.params.category.toLowerCase();
    const filteredProducts = await Product.find({ category: { $regex: category, $options: 'i' } }); // case-insensitive search
    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export { getProducts, getProductById, addProduct, updateProduct, deleteProduct, getProductsByCategory };