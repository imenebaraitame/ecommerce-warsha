import { cloudinary } from "../config/cloudinary.js";
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
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);
    
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
     // check for name uniqueness
    const existingProduct = await Product.findOne({ name: name });
    if (existingProduct) {
      if(req.file && req.file.public_id) {
        await cloudinary.uploader.destroy(req.file.public_id);
      }
      const error = new Error("product name must be unique");
      error.status = 400;
      error.message = "Product name must be unique";
      throw error;  
    }
    const productData = {
      name,
      price,
      description,
      category,
      quantity
    }
    
    if(req.file) {
      console.log('Image uploaded to Cloudinary');
      console.log('   URL:', req.file.path);
      console.log('   Public ID:', req.file.filename);

      productData.image = {
        url: req.file.path,
        publicId: req.file.filename
      };
    } else {
      console.log('No image uploaded');
    }
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    console.log('Product saved successfully:', savedProduct._id);

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error in addProduct:', error.message);
    console.error('Stack:', error.stack);
    if (req.file) {
      try {
        await cloudinary.uploader.destroy(req.file.filename);
        console.log('Cleaned up uploaded image from Cloudinary');
      } catch (cleanupError) {
        console.error('Error cleaning up uploaded image:', cleanupError);
      }
    }
    next(error);
  }

};

// Put ,  update product
const updateProduct = async(req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, quantity } = req.body;

    console.log('Updating product:', id);
    console.log('Update data:', req.body);
    console.log('New image:', req.file);

    // Find existing product
    const product = await Product.findById(id);

    if (!product) {
      if (req.file) {
        await cloudinary.uploader.destroy(req.file.filename);
      }
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    // Update fields
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (category) product.category = category;
    if (quantity !== undefined) product.quantity = quantity;

    // Handle image update
    if (req.file) {
      // Delete old image from Cloudinary if it exists
      if (product.image && product.image.publicId) {
        await cloudinary.uploader.destroy(product.image.publicId);
      }
      
      // Update with new image
      product.image = {
        url: req.file.path,
        publicId: req.file.filename
      };
    }

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    if (req.file) {
      try {
        await cloudinary.uploader.destroy(req.file.filename);
      } catch (cleanupError) {
        console.error('Error cleaning up uploaded image:', cleanupError);
      }
    }
    next(error);
  }
};


// delete product
const deleteProduct = async(req, res, next) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findById(id);
    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    // Delete image from Cloudinary if it exists
    if (product.image && product.image.publicId) {
      await cloudinary.uploader.destroy(product.image.publicId);
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Product deleted successfully" });
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