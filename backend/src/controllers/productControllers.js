import Product from "../models/product.js";


//get all products
const getProducts = async(req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next((error));
  }
};

// get product by id
const getProductById = async(req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      error.message = "Product not found";
      throw error; 
    }
    res.json(product);
  } catch (error) {
    console.log('Error in getBookById:', error);
    next(error); 
  }
};

// add a new product
const addProduct = async(req, res, next) => {
  try {
    const { name, price, description, category, quantity } = req.body;
    if (!name || !price || !description || !category || !quantity) {
      const error = new Error("All fields are required");
      error.status = 400;
      throw error;
    }

    if (isNaN(price)) {
      const error = new Error("Product price must be a number");
      error.status = 400;
      throw error; 
    }
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      quantity
    });
    // check for name uniqueness
    const existingProduct = await Product.findOne({ name: name });
    if (existingProduct) {
      const error = new Error("product name must be unique");
      error.status = 400;
      error.message = "Product name must be unique";
      throw error;  
    }

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }

};

// Put ,  update product
const updateProduct = async(req, res, next) => {
  try {
    const productId = req.params.id;
    const { name, price, description, category, quantity } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, description, category, quantity },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      const error = new Error("Product not found");
      error.status = 404;
      error.message = "Product not found";
      throw error;
    }
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

// delete product
const deleteProduct = async(req, res, next) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      const error = new Error("Product not found");
      error.status = 404;
      error.message = "Product not found";
      throw error;
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// get products by category
const getProductsByCategory = async(req, res, next) => {
  try {
    const category = req.params.category.toLowerCase();
    const filteredProducts = await Product.find({ category: { $regex: category, $options: 'i' } }); // case-insensitive search
    res.json(filteredProducts);
  } catch (error) {
    next(error);
  }
};

//get product by (name) or by category, name and category
const searchProductByFilters = async (req, res, next) => {
  try {
    const {name, category ,minPrice, maxPrice } = req.query;

    const query = {};

    // Name filter
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    // Category filter
    if (category) {
      query.category = { $regex: category, $options: "i" };
    }
    // Price filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(query);
    res.json(products);

  }catch (error) {
    next(error);
  }
}

export { getProducts, getProductById, addProduct, updateProduct, deleteProduct, getProductsByCategory, searchProductByFilters };