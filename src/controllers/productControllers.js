// product related controller functions will be here

import products from "../data/mockproductData.js";

const getProducts = (req, res) => {
  res.json(products);
};

// get product by id
const getProductById = (req, res) => {
  const productId = parseInt(req.params.id); // get id from url params
  const product = products.find((p) => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

// add a new product
const addProduct = (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1;

  //check body has name, price, description, category
  if (!newProduct.name) {
    return res.status(400).json({ message: "Product name is required" });
  }
  if (!newProduct.price) {
    return res.status(400).json({ message: "Product price is required" });
  }
  if (!newProduct.category) {
    return res.status(400).json({ message: "Product category is required" });
  }

  if (isNaN(newProduct.price)) {
    return res.status(400).json({ message: "Product price must be a number" });
  }
  if (newProduct.description.length > 200) {
    return res.status(400).json({
      message: "Product description must be less than 200 characters",
    });
  }

  products.push(newProduct);
  res.status(201).json(newProduct);
};

// Put ,  update product

const updateProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
   const { name, price, description, category } = req.body;

    if (name) products[productIndex].name = name; 
    if (price) {
      if (isNaN(price)) {
        return res.status(400).json({ message: "Product price must be a number" });
      }
        products[productIndex].price = price;
    }
    if (description) products[productIndex].description = description;
    if (category) products[productIndex].category = category;

  res.json(products[productIndex]);
};

// delete product
const deleteProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex((p) => p.id === productId);
  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products.splice(productIndex, 1);
  res.json({ message: "Product deleted successfully" });
};

export { getProducts, getProductById, addProduct, updateProduct, deleteProduct };