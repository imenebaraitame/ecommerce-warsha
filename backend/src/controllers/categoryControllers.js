import Category from "../models/category.js";


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
const getCategoryById = async(req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
  
    if (!category) {
      const error = new Error("Category not found");
      error.status = 404;
      error.message = "Category not found";
      throw error; 
    } 
    res.json(category);
  } catch (error) {
    next(error);
  }
};

// Add new category
const addCategory = async(req, res, next) => {
  try {
    const {name} = req.body;
    if (!name) {
      const error = new Error("Category name is required");
      error.status = 400;
      error.message = "Category name is required";
      throw error;
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      const error = new Error("Category must be unique"); 
      error.status = 400;
      error.message = "Category must be unique";
      throw error;
    }

    const newCategory = new Category({ name });
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (error) {
    next(error);
  }
};

// Update category
const updateCategory = async(req, res, next) => {
  try {
    const categoryId = req.params.id;
    const {name} = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name},
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      const error = new Error("Category not found");
      error.status = 404;
      error.message = "Category not found";
      throw error; 
    }
    res.json(updatedCategory);

  } catch (error) {
    next(error);
  }
};

// Delete category
const deleteCategory = async(req, res, next) => {
try {
    const categoryId = req.params.id;
    const deletedCategory= await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      const error = new Error("Category not found");
      error.status = 404;
      error.message = "Category not found";
      throw error; 
    }
    res.json({ message: "Category deleted successfully" });
} catch (error) {
  next(error)
}
};

export {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};