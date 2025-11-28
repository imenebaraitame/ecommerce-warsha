import categories from "../data/mockcategoryData.js";

// Get all categories
const getCategories = (req, res) => {
  res.json(categories);
};

// Get category by id
const getCategoryById = (req, res) => {
  const categoryId = parseInt(req.params.id);
  const category = categories.find((c) => c.id === categoryId);

  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ message: "Category not found" });
  }
};

// Add new category
const addCategory = (req, res) => {
  const newCategory = {
    id: categories.length + 1,
    name: req.body.name,
  };

  if (!newCategory.name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  categories.push(newCategory);
  res.status(201).json(newCategory);
};

// Update category
const updateCategory = (req, res) => {
  const categoryId = parseInt(req.params.id);
  const categoryIndex = categories.findIndex((c) => c.id === categoryId);

  if (categoryIndex === -1) {
    return res.status(404).json({ message: "Category not found" });
  }

  const { name } = req.body;
  if (name) categories[categoryIndex].name = name;

  res.json(categories[categoryIndex]);
};

// Delete category
const deleteCategory = (req, res) => {
  const categoryId = parseInt(req.params.id);
  const categoryIndex = categories.findIndex((c) => c.id === categoryId);

  if (categoryIndex === -1) {
    return res.status(404).json({ message: "Category not found" });
  }

  categories.splice(categoryIndex, 1);
  res.json({ message: "Category deleted successfully" });
};

export {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};