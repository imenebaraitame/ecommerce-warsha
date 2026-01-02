import Category from "../models/category.js";
import express from "express";
import errorMiddleware from "../middlewares/errorMiddleware.js";
const app = express();

// use error middleware
app.use(errorMiddleware);

// Get all categories
const getCategories = async(req, res) => {
  try {
    const categories  = await Category.find()
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error" , error: error.message} );
  }
};

// Get category by id
const getCategoryById = async(req, res) => {
  try {
    const category = Category.findById(req.params.id);
  
    if (!category) {
      res.status(404).json({ message: "Category not found" });
    } 
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Add new category
const addCategory = async(req, res) => {
  try {
    const {name} = req.body;
    if (!name) {
      return res.status(400).json({ message: "category name is required" });
    }
    const newCategory = new Category({name});

    const existingCategory = await Category.findOne({ name: name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category name must be unique" });
    }

    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Validation Error", error: error.message });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Update category
const updateCategory = async(req, res) => {
  try {
    const categoryId = req.params.id;
    const {name} = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name},
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory);

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Validation Error", error: error.message });
    }
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete category
const deleteCategory = async(req, res) => {
try {
    const categoryId = req.params.id;
    const deletedCategory= await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
} catch (error) {
  res.status(500).json({ message: "Server Error", error: error.message });
}
};

export {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};